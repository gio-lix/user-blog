export const checkFileErr = (file: any) => {
    let err = ""

    if (!file)
        err = "File does not exist"

    if (file.size > 1024 * 1024)
        err = "The largest image size is 1mb."

    if (file.type !== "image/jpeg" && file.type !== "image/png")
        err = "Image format is incorrect."

    return  err
}