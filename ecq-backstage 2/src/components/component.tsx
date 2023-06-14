import { defineComponent, h, resolveDynamicComponent, VNode } from 'vue'

// 自定义动态组件
interface ComponentProps {
  is: string | object
  [key: string]: any
}

export default defineComponent({
  props: {
    is: {
      type: [String, Object],
      required: true
    }
  },
  setup(props, {slots}) {
    const { is, ...rest } = props
   const Component= resolveDynamicComponent(is) as any
   const children = slots.default?.() || [];
    return ()=>(
        h(Component,{...rest},children)
    )
  }
})
