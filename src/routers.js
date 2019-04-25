import Index from './views/index';
import Demo1 from './views/demo1';
import Demo2 from './views/demo2';
import Demo3 from './views/demo3';
const routers = [
    {
		path: '/',name: 'index',component: Index
    },
	{
		path: '/demo1',name: 'demo1',component: Demo1
    },
    {
		path: '/demo2',name: 'demo2',component: Demo2
    },
    {
		path: '/demo3',name: 'demo3',component: Demo3
    },
]
export default routers
