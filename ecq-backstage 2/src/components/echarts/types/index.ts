export type Eyegame = {
    detail: {
        ability_mixture: string
        ability_single: string
		conversion_price:string

		reaction:string

		focus:string,
		antiInterference:string
    }
    eyemove: Array<[number, number]>
	eyemoveData:{focus:string,anxiety:string}
    name: string
    score: string
    time: number
}