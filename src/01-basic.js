import { init } from 'snabbdom/build/package/init'
import { classModule } from 'snabbdom/build/package/modules/class'
import { styleModule } from 'snabbdom/build/package/modules/style'
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners'
import { h } from 'snabbdom/build/package/h'

var patch = init([
    classModule,
    styleModule,
    eventListenersModule,
]);

const data = [
    {
        rank: 7,
        title: 'the good',
        desc: 'a bounty hunting scam'
    },
    {
        rank: 8,
        title: '12 angry man',
        desc: 'a dissenting juror'
    },
    {
        rank: 9,
        title: 'fight club',
        desc: 'an insomniac office'
    }
];
const sortTypeList = [
    {
        key: 'rank',
        value: 'Rank'
    },
    {
        key: 'title',
        value: 'Title'
    },
    {
        key: 'desc',
        value: 'Description'
    },
];

let vnodeTitle = h('h1', 'Top 10 movies');

function createVnodeSort () {
    let vnodeSort = h('div.sort-box', [
        h('label', 'sort By：'),
        h('ul', sortTypeList.map(item => {
            return h('li', {
                on: {
                    click: () => {
                        sortByKey(item.key);
                    }
                }
            }, item.value);
        })),
        h('button', {
            on: {
                click: () => {
                    addListItem()
                }
            }
        },'添加')
    ]);
    return vnodeSort;
}

function createVnodeList (data) {
    let vnodeList = h(`ul.list.${Date.now()}`, data.map((item, index) => {
        return h('li.list-item', [
            h('span', item.rank),
            h('h3', item.title),
            h('p', item.desc),
            h('i', {
                on: {
                    click: () => {
                        deleteListItem(index);
                    }
                }
            }, 'x')
        ])
    }));
    return vnodeList
}

function createVnodeContainer (...vnodeList) {
    let vnode = h('div#container', {
        style: {
            backgroundColor: 'green',
            padding: '30px'
        },
        on: {
            click: () => {

            }
        }
    }, [...vnodeList]);
    return vnode;
}

let app = document.querySelector('#app');
let oldVnodeList = createVnodeList(data);

patch(app, createVnodeContainer(vnodeTitle, createVnodeSort(), oldVnodeList));

function sortByKey (key) {
    data.sort((a, b) => {
        if (a[key] > b[key]) {
            return -1;
        } else {
            return 1;
        }
    });
    //patch(oldVnode, h('!'));
    oldVnodeList = patch(oldVnodeList, createVnodeList(data));
}

function deleteListItem (index) {
    data.splice(index, 1);
    oldVnodeList = patch(oldVnodeList, createVnodeList(data));
}

function addListItem () {
    data.unshift({
        rank: 7,
        title: 'the good',
        desc: 'a bounty hunting scam'
    });
    oldVnodeList = patch(oldVnodeList, createVnodeList(data));
}
