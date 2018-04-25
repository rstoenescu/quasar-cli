import { shallow } from '@vue/test-utils'
// import List from './List.vue'
// You should point to your components here:
import List from '@/components/List.vue'

describe('List.vue in spec', () => {
  it('renders li for each item in props.items', () => {
    const items = ['', '']
    const wrapper = shallow(List, {
      propsData: { items }
    })
    expect(wrapper.findAll('li')).to.have.lengthOf(items.length)
  })
  it('calls increment method when button is clicked', () => {
    const wrapper = shallow(List)
    const clickMethodStub = sinon.stub()
    wrapper.setMethods({ increment: clickMethodStub })
    wrapper.find('button').trigger('click')
    expect(clickMethodStub.called, 'clickMethodStub.called is true').to.equal(true)
  })
  it('increments counter when button is clicked', () => {
    const wrapper = shallow(List)
    wrapper.find('button').trigger('click')
    expect(wrapper.vm.counter, 'wrapper.vm.counter is equal to 1').to.equal(1)
  })
})
