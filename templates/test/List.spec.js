import { shallow } from '@vue/test-utils'
import List from '@/components/List.vue'

describe('List.vue', () => {
  it('renders li for each item in props.items', () => {
    const items = ['', '']
    const wrapper = shallow(List, {
      propsData: { items }
    })
    expect(wrapper.findAll('li')).toHaveLength(items.length)
  })
})
