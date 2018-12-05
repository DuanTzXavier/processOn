export class CopyUtils {
    copy(fromObj) {
        let _obj = JSON.stringify(fromObj),
            objClone = JSON.parse(_obj);
        return objClone
    }
}