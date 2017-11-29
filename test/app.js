export default 42;
import dep1 from './dep1.js';
import dep2 from './dep2';
import dep3, {relative} from 'dep3';

console.log('app');

dep1();
dep2();
dep3();
relative();
