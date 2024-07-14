import { act, renderHook, } from '@testing-library/react';
import { useCTA, } from '../src';
import { arbitraryKey, initial, initialChanges, payload, } from './setup/simple';

describe( 'dispatch.cta.replaceInitial( payload )', function() {
	test( 'should set new `initial`', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.update( payload, );
			result.current[ 1 ].cta.replaceInitial( payload, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
	}, );

	test( 'should set new `initial` when `payload` is a function', function() {
		const payload = {
			test1: 1,
			test2: 'me',
			test3: false,
			2: 22,
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.update( () => payload, );
			result.current[ 1 ].cta.replaceInitial( () => payload, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
	}, );

	test( 'should not set new `initial` when `payload` is a function that returns `undefined`', function() {
		const payload = undefined;
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.replaceInitial( () => payload, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
	}, );

	test( 'should not set new `initial` when `payload` is a function that returns `null`', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			// @ts-expect-error making sure invalid return is not evaluated
			result.current[ 1 ].cta.replaceInitial( () => null, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.previousInitial, ).toBe( null, );
	}, );

	test( 'should have `changes` when setting new `initial`', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.replaceInitial( payload, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( initialChanges, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
	}, );

	test( 'should have `changes` when setting new `initial` with arbitrary key', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const payload = {
			...initial,
			...arbitraryKey,
		};
		act( () => {
			result.current[ 1 ].cta.replaceInitial( payload, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( initial, );
		expect( result.current[ 1 ].state.changes, ).toStrictEqual( arbitraryKey, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
	}, );

	test( 'should set new `initial` when custom action is defined', function() {
		const { result, } = renderHook( () => useCTA( {
			initial,
			actions: {
				customAction() {
					return undefined;
				},
			},
		}, ), );

		act( () => {
			result.current[ 1 ].cta.update( payload, );
			result.current[ 1 ].cta.replaceInitial( payload, );
		}, );

		expect( result.current[ 0 ], ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.changes, ).toBe( null, );
		expect( result.current[ 1 ].state.initial, ).toStrictEqual( payload, );
		expect( result.current[ 1 ].state.previousInitial, ).toStrictEqual( initial, );
	}, );
}, );
