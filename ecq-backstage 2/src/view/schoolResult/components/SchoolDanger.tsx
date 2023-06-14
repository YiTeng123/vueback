
export default defineComponent({
    setup(prop, ctx) {
        return () => (
            <>
                <div class='flex w-full min-h-[300px] mt-[10px] justify-center'>

                    <div class='classTable w-[100%] min-h-[150px] flex flex-col white mt-8'>
                        <div class='h-[15%] classHeader flex border-solid border-white border justify-center items-center'>情绪-心理健康测评 异常值分布</div>
                        <div class='h-[15%] classHeader flex border-solid border-white border ' style={{ borderTop: 'none' }}>
                            <div class='flex-1 displayy border-solid border-white border-r py-3'>序号</div>
                            <div class='flex-[2] displayy border-solid border-white border-r'>测试者编号</div>
                            <div class='flex-1 displayy border-solid border-white border-r'>姓名</div>
                            <div class='flex-1 displayy border-solid border-white border-r'>性别</div>
                            <div class='flex-1 displayy border-solid border-white border-r'>年级</div>
                            <div class='flex-[1] displayy border-solid border-white border-r'>班级</div>
                            <div class='flex-[2] displayy'>问题</div>
                        </div>

                        <DangerItem/>

                    </div>

                </div>

            </>
        )
    }
})

const DangerItem =defineComponent({
    setup(prop, ctx) {

        return () => (
            <div class='h-[15%] classHeader flex border-solid border-white border ' style={{ borderTop: 'none' }}>
                <div class='flex-1 displayy border-solid border-white border-r py-3'>序号</div>
                <div class='flex-[2] displayy border-solid border-white border-r'>测试者编号</div>
                <div class='flex-1 displayy border-solid border-white border-r'>姓名</div>
                <div class='flex-1 displayy border-solid border-white border-r'>性别</div>
                <div class='flex-1 displayy border-solid border-white border-r'>年级</div>
                <div class='flex-[1] displayy border-solid border-white border-r'>班级</div>
                <div class='flex-[2] displayy'>问题</div>
            </div>
        )
    }
})



