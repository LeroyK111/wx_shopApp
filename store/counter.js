/*
 * 使用全局状态中间件，pinia，进行数据传递
 * 
 */

// stores/counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
	state: () => {
		return { count: 0 };
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {
		increment() {
			this.count++;
		},
	},
});