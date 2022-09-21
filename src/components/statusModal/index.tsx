import React, {FC, SyntheticEvent, useRef, useState} from 'react';
import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import {MdOutlineMonochromePhotos, MdPhoto} from "react-icons/md"
import {IoMdClose} from "react-icons/io"
import s from "./StatusModal.module.scss"
import {setError} from "../../redux/slices/authSlices";
import {imageUpload} from "../../utils/ImageUploaded";
import {createPosts} from "../../redux/slices/postsSlice";

interface Props {
    setStatusTrue: Function
}

const StatusModal:FC<Props> = ({setStatusTrue}) => {
    const dispatch = useAppDispatch()
    const {user, token} = useAppSelector((state: RootState) => state.auth)
    const [content, setContent] = useState<string>("")
    const [images, setImages] = useState<any>([])
    const [stream, setStream] = useState(false)
    const [tracks, setTracks] = useState<any>()
    const useVideoRef = useRef<any>()
    const useCanvasRef = useRef<any>()

    const  handleChangeImage = (e: any) => {
        let err = ""
        let newImages: any = []
        if (!e.target.files) {
            return err = "File does not exist";
        }

        const files = [...e.target.files]

        files.forEach(file => {
            if (file.type !== "image/jpeg" && file.type !== "image/png") {
                return err = "Image format is incorrect"
            }
            return newImages.push(file)
        })

        setImages([...images, ...newImages])
    }

    const deleteImage = (index: number) => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }
    const handleScreenCamera = () => {
        setStream(true)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({video: true})
                .then(mediaStream => {
                    useVideoRef.current.srcObject = mediaStream
                    useVideoRef.current.play()
                    const track: any = mediaStream.getTracks()
                    setTracks(track[0])
                })
                .catch(err => console.log(err))
        }
    }

    const handleScreenCapture = () => {
        const width = useVideoRef.current.clientWidth
        const height = useVideoRef.current.clientHeight

        useCanvasRef.current.setAttribute("width", width)
        useCanvasRef.current.setAttribute("height", height)
        const ctx = useCanvasRef.current.getContext("2d")
        ctx.drawImage(useVideoRef.current, 0,0,width,height)
        let URL = useCanvasRef.current.toDataURL()
        setImages([...images, {camera: URL}])
    }

    const handleStreamStop = () => {
        tracks.stop()
        setStream(false)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        let err = ""
        let media: string[] = []
        if (images.length === 0) {
            return dispatch(setError("Please add your photos"))
        }

        for (let img of images) {
            if (img.camera) {
                const {success,error} = await imageUpload(img.camera)
                media.push((success as any).url)
                err = error
            } else {
                const {success,error} = await imageUpload(img)
                media.push((success as any).url)
                err = error
            }

        }
        if (media.length > 0) {
            dispatch(createPosts({content,images: media, user, token} ))
        }

    }

    return (
        <div className={s.modal}>
            <form onSubmit={handleSubmit}>
                <div>
                    <h5>Create Posts</h5>
                    <span role="button" onClick={() => setStatusTrue(false)}>&times;</span>
                </div>

                <div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        name="content"
                        placeholder={`${user?.username}, what are you thinking? `}>

                    </textarea>
                    <div className={s.imageBox}>
                        {images.map((img: any, index: number) => {
                            return (
                                <div key={index}>
                                    <img  src={img.camera ? img.camera : URL.createObjectURL(img)} alt=""/>
                                    <span role="button" onClick={() => deleteImage(index)}>
                                        <IoMdClose />
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                    {stream && (
                        <div>
                            <video
                                src=""
                                autoPlay
                                muted
                                ref={useVideoRef}
                                width="100%"
                                height="100%"
                            />
                            <span className={s.stopStream} role="button" onClick={handleStreamStop}>
                                <IoMdClose />
                            </span>
                            <canvas ref={useCanvasRef} style={{display: "none"}}/>
                        </div>
                    )}
                    <div className={s.file}>
                        {stream ? (
                            <>
                                <span role="button" onClick={handleScreenCapture}>
                                    <MdOutlineMonochromePhotos  />
                                </span>
                            </>
                        ) : (
                            <>
                                <span role="button" onClick={handleScreenCamera}>
                                    <MdOutlineMonochromePhotos  />
                                </span>
                                <div>
                                    <label htmlFor="file">
                                        <MdPhoto  />
                                    </label>
                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        multiple
                                        accept="image"
                                        hidden
                                        onChange={handleChangeImage}
                                    />
                                </div>
                            </>
                        )}

                    </div>
                </div>
                <button type="submit">Post</button>
            </form>
        </div>
    );
};

export default StatusModal;