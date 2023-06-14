

const A=[
    {
        value: '一班',
        label: '一班',

    },
    {
        value: '二班',
        label: '二班',
    },
    {
        value: '三班',
        label: '三班',
    },
    {
        value: '四班',
        label: '四班',
    },
    {
        value: '五班',
        label: '五班',
    },
    {
        value: '六班',
        label: '六班',
    },
    {
        value: '七班',
        label: '七班',
    },
    {
        value: '八班',
        label: '八班',
    },
    {
        value: '九班',
        label: '九班',
    },
    {
        value: '十班',
        label: '十班',
    },
   
]



export function useCascder() {
    let casValue = ref([])
    const options = [
        {
            value: '初一',
            label: '初一',
            children:A
          
        },
        {
            value: '初二',
            label: '初二',
            children:A

        },
        {
            value: '初三',
            label: '初三',
            children:A

        },
        {
            value: '高一',
            label: '高一',
            children:A

        },
        {
            value: '高二',
            label: '高二',
            children:A

        },
        {
            value: '高三',
            label: '高三',
            children:A

        },
    ]
    const handleChange = (value: any) => {
        console.log(value)
    }
    return {
        casValue, options, handleChange
    }
}