



export const resetEcharts = async (fun: Function) => {

    Promise.resolve().then(() => {
        fun()
    }).then(() => {
        fun()
    })


}