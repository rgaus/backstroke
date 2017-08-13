import assert from 'assert';
import {webhookJob} from './index';
import MockModel from '../../test-helpers/mock-model';
import sinon from 'sinon';

const LONG_TIME_AGO = '2017-08-10T10:54:53.450Z';

const User = new MockModel(),
      Link = new MockModel([], {owner: User});

const MockWebhookQueue = {
  queue: [],
  reset() {
    this.queue = [];
  },
  push(item) {
    const id = (new Date()).getTime();
    this.queue.push({id, item});
    return Promise.resolve(id);
  },
  pop() {
    const popped = this.queue.pop();
    return Promise.resolve(popped ? popped.item : null);
  },
};

Link.methods.display = function() { return this; }

describe('webhook job', function() {
  let user, link;
  beforeEach(async () => {
    MockWebhookQueue.reset();

    user = await User.create({username: 'ryan'});
    link = await Link.create({
      name: 'My Link',
      enabled: true,
      owner: user.id,
      lastSyncedAt: LONG_TIME_AGO,

      upstreamType: 'repo',
      upstreamOwner: 'foo',
      upstreamRepo: 'bar',
      upstreamIsFork: false,
      upstreamBranches: '["master"]',
      upstreamBranch: 'master',

      forkType: 'all-forks',
      forkOwner: undefined,
      forkRepo: undefined,
      forkBranches: undefined,
      forkBranch: undefined,
    });
  });

  it(`should queue an update if the link hasn't been updated`, async function() {
    Link.findAll = sinon.stub().resolves([{...link, owner: user}]);

    const result = await webhookJob(Link, User, MockWebhookQueue);

    // Item was added to the queue.
    assert.equal(MockWebhookQueue.queue.length, 1);
    assert.equal(MockWebhookQueue.queue[0].item.type, 'AUTOMATIC');
    assert.equal(MockWebhookQueue.queue[0].item.link.id, link.id);
    assert.equal(MockWebhookQueue.queue[0].item.user.id, link.ownerId);

    // And the last synced time was updated.
    assert.notEqual((await Link.findById(link.id)).lastSyncedAt, LONG_TIME_AGO);
  });
  it(`should not fail if there are no links to be updated`, async function() {
    Link.findAll = sinon.stub().resolves([]); // No links

    const result = await webhookJob(Link, User, MockWebhookQueue);
    assert.equal(result, null);

    // Queue is still empty
    assert.equal(MockWebhookQueue.queue.length, 0);

    // Link last synced time wasn't changed.
    assert.equal((await Link.findById(link.id)).lastSyncedAt, LONG_TIME_AGO);
  });
});
