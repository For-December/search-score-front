declare module Items {
    export interface AuthMsg {
        token: string
        expirationAt: number
    }

    export interface TransDef {
        code: number
        data: object
        msg: string
    }
    export interface ScoreInfo {
        teacher: string
        courseName: string
        scores: ScoreDetail[]
        averageScore: number
        totalStudents: number

    }

    export interface ScoreDetail {
        scoreRange: string
        numberOfStudents: number
    }

    export interface SearchReq {
        teacherName: string
        courseName: string
    }
}