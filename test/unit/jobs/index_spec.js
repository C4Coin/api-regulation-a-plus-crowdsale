const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

class mockBull {
  process() {}
}

mockBull.prototype.process = sinon.spy()

describe('jobs', () => {
  const jobs = proxyquire('../../../src/jobs', {
    bull: mockBull
  })

  const testJob = jName => {
    it(`processed ${jName}`, () => {
      expect(jobs.process).to.have.been.calledWithMatch(jName)
    })
  }

  it('Returns the queue', () => {
    expect(jobs).to.be.instanceOf(mockBull)
  })
  ;['hello'].forEach(testJob)
})
