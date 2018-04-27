import { shallow, createLocalVue } from '@vue/test-utils'
import Quasar, * as All from '@quasar'
import List from '@/components/List.vue'

const localVue = createLocalVue()
localVue.use(Quasar, {components: All, directives: All, plugins: All})

describe('List.vue in spec', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(List, {
      localVue
    })
  })
  it('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).to.equal(true)
  })
  it('renders li for each item in props.items', () => {
    const items = ['', '']
    wrapper.setProps({ items })
    expect(wrapper.findAll('li')).to.have.lengthOf(items.length)
  })
  it('calls increment method when q-btn is clicked', () => {
    const clickMethodStub = sinon.stub()
    wrapper.setMethods({ increment: clickMethodStub })
    wrapper.find('.q-btn').trigger('click')
    expect(clickMethodStub.called, 'clickMethodStub.called is true').to.equal(true)
  })
  it('increments counter when q-btn is clicked', () => {
    wrapper.find('.q-btn').trigger('click')
    expect(wrapper.vm.counter, 'wrapper.vm.counter is equal to 1').to.equal(1)
  })
})
