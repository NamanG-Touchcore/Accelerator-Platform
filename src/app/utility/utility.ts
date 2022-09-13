

export class Utility {

    public static extractStringValue(value: string, seperator: string, index: number): string {
        let stringValue = value
        let extractedString = value.split(seperator)
        if (extractedString[index]) {
            stringValue = extractedString[index]
        }
        return stringValue
    }

    public static extractKeyValueFromString(key: string, inputValue: string): string {
        var regex = new RegExp(`[\\?&]${key}=([^&#]*)`)
        var results = regex.exec(inputValue)
        return results ? results[1] : null
    }

    public static isRepeatQuestion(step): boolean {
        return step.repeat
    }

    public static stringFormat(value: string, args: any): string {
        if (!value) {
            return value
        }
        for (let index = 0; index < args.length; index++) {
            value = value.replace(`{${index}}`, args[index])
        }
        return value
    }


}