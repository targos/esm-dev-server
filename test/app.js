export default 42;
import dep1 from './dep1.js';
import dep2 from './dep2';
import dep3, {relative} from 'dep3';
import dep4 from './dep4';

console.log('app');

dep1();
dep2();
dep3();
relative();
dep4();
