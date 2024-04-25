declare module Items {
    export interface ScoreInfo {
        teacher: string
        courseName: string
        scores: ScoreDetail[]
        averageScore: number

    }

    export interface ScoreDetail {
        scoreRange: string
        numberOfStudents: number
    }

}