import{h as x,g as z,f as O}from"./app-BGF2Spty.js";var _=x();const C=z(_);var m={exports:{}},d={};/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var h;function q(){if(h)return d;h=1;var i=O();function W(r,u){return r===u&&(r!==0||1/r===1/u)||r!==r&&u!==u}var y=typeof Object.is=="function"?Object.is:W,V=i.useSyncExternalStore,j=i.useRef,p=i.useEffect,M=i.useMemo,w=i.useDebugValue;return d.useSyncExternalStoreWithSelector=function(r,u,s,v,c){var t=j(null);if(t.current===null){var o={hasValue:!1,value:null};t.current=o}else o=t.current;t=M(function(){function R(e){if(!S){if(S=!0,n=e,e=v(e),c!==void 0&&o.hasValue){var a=o.value;if(c(a,e))return l=a}return l=e}if(a=l,y(n,e))return a;var b=v(e);return c!==void 0&&c(a,b)?(n=e,a):(n=e,l=b)}var S=!1,n,l,E=s===void 0?null:s;return[function(){return R(u())},E===null?void 0:function(){return R(E())}]},[u,s,v,c]);var f=V(r,t[0],t[1]);return p(function(){o.hasValue=!0,o.value=f},[f]),w(f),f},d}var D;function U(){return D||(D=1,m.exports=q()),m.exports}var F=U();export{C as R,_ as r,F as w};
