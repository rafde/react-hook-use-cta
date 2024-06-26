import { renderHook, act, } from '@testing-library/react';
import { useCTA, returnActionsType, } from '../src';

describe( 'useCTA', function() {
	const initialChanges = {
		there: 'you',
		you: 'me?',
		2: 2,
	};
	const initial = {
		...initialChanges,
		hi: 1,
	};
	const changes = {
		there: 'me',
		you: 'yes, you.',
		2: 22,
	};
	const payload = {
		...changes,
		hi: 1,
	};
	const arbitraryKey = {
		'arbitrary key': 'value',
	};
	const changesWithArbitraryKey = {
		...changes,
		...arbitraryKey,
	};
	const payloadWithArbitraryKey = {
		...changesWithArbitraryKey,
		hi: 1,
	};

	test( 'should not create a new dispatch when an action is called', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const [
			,
			initDispatch,
		] = result.current;

		act( () => {
			result.current[ 1 ].cta.update( 'hi', 1, );
		}, );

		expect( initDispatch, ).toEqual( result.current[ 1 ], );
	}, );

	describe( 'predefined', () => {
		describe( 'dispatch.cta.replace( state | (state => state | undefined ))', function() {
			test( 'should `replace` state', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );
				act( () => {
					result.current[ 1 ].cta.replace( payload, );
				}, );

				expect( result.current[ 0 ], ).toEqual( payload, );
				expect( result.current[ 1 ].state.changes, ).toEqual( changes, );

				act( () => {
					result.current[ 1 ].cta.replace( initial, );
				}, );

				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
			}, );

			test( 'should `replace` state that includes `{"arbitrary key": "value"}`', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].cta.replace( payloadWithArbitraryKey, );
				}, );

				expect( result.current[ 0 ], ).toEqual( payloadWithArbitraryKey, );
				expect( result.current[ 1 ].state.changes, ).toEqual( changesWithArbitraryKey, );

				act( () => {
					result.current[ 1 ].cta.replace( initial, );
				}, );

				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
			}, );

			test( 'should `replace` state when `payload` is a function', function() {
				const payload = {
					there: 'me',
					hi: 1,
					you: 'yes, you.',
					2: 22,
				};
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].cta.replace( () => payload, );
				}, );

				expect( result.current[ 0 ], ).toEqual( payload, );
				expect( result.current[ 1 ].state.changes, ).toEqual( changes, );

				act( () => {
					result.current[ 1 ].cta.replace( initial, );
				}, );

				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
			}, );

			test( 'should not `replace` state when function `payload` returns `null`', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					// @ts-expect-error making sure invalid return is not evaluated
					result.current[ 1 ].cta.replace( () => null, );
				}, );

				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
			}, );

			test( 'should `replace` state when `payload` is a function that returns state with `{"arbitrary key": "value"}`', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].cta.replace( () => payloadWithArbitraryKey, );
				}, );

				expect( result.current[ 0 ], ).toEqual( payloadWithArbitraryKey, );
				expect( result.current[ 1 ].state.changes, ).toEqual( changesWithArbitraryKey, );
			}, );

			test( 'should not `replace` state when `payload` is a function that returns `undefined`', function() {
				const payload = undefined;
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].cta.replace( () => payload, );
				}, );

				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();

				act( () => {
					result.current[ 1 ].cta.replace( initial, );
				}, );

				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
			}, );

			test( 'should `replace` state when custom action is defined', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						customAction() {
							return undefined;
						},
					},
				}, ), );
				act( () => {
					result.current[ 1 ].cta.replace( payload, );
				}, );

				expect( result.current[ 0 ], ).toEqual( payload, );
				expect( result.current[ 1 ].state.changes, ).toEqual( changes, );

				act( () => {
					result.current[ 1 ].cta.replace( initial, );
				}, );

				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
			}, );
		}, );

		describe( 'dispatch.cta.replaceInitial( initial | (state => initial | undefined ))', function() {
			test( 'should set new `initial`', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].cta.replace( payload, );
					result.current[ 1 ].cta.replaceInitial( payload, );
				}, );

				expect( result.current[ 0 ], ).toEqual( payload, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
				expect( result.current[ 1 ].state.initial, ).toEqual( payload, );
			}, );

			test( 'should set new `initial` when `payload` is a function', function() {
				const payload = {
					there: 'me',
					hi: 1,
					you: 'yes, you.',
					2: 22,
				};
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].cta.replace( () => payload, );
					result.current[ 1 ].cta.replaceInitial( () => payload, );
				}, );

				expect( result.current[ 0 ], ).toEqual( payload, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
				expect( result.current[ 1 ].state.initial, ).toEqual( payload, );
			}, );

			test( 'should set new `initial` when `payload` is a function that returns state with `{"arbitrary key": "value"}`', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].cta.replace( () => payloadWithArbitraryKey, );
					result.current[ 1 ].cta.replaceInitial( () => payloadWithArbitraryKey, );
				}, );

				expect( result.current[ 0 ], ).toEqual( payloadWithArbitraryKey, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
				expect( result.current[ 1 ].state.initial, ).toEqual( payloadWithArbitraryKey, );

				act( () => {
					result.current[ 1 ].cta.replace( initial, );
				}, );

				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toEqual( {
					...arbitraryKey,
					...initialChanges,
				}, );
				expect( result.current[ 1 ].state.initial, ).toEqual( payloadWithArbitraryKey, );
			}, );

			test( 'should not set new `initial` when `payload` is a function that returns `undefined`', function() {
				const payload = undefined;
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].cta.replaceInitial( () => payload, );
				}, );

				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
				expect( result.current[ 1 ].state.initial, ).toEqual( initial, );
			}, );

			test( 'should not set new `initial` when `payload` is a function that returns `null`', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					// @ts-expect-error making sure invalid return is not evaluated
					result.current[ 1 ].cta.replaceInitial( () => null, );
				}, );

				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
				expect( result.current[ 1 ].state.initial, ).toEqual( initial, );
			}, );

			test( 'should have `changes` when setting new `initial`', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ].cta.replaceInitial( payload, );
				}, );

				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toEqual( initialChanges, );
				expect( result.current[ 1 ].state.initial, ).toEqual( payload, );
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

				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toEqual( arbitraryKey, );
				expect( result.current[ 1 ].state.initial, ).toEqual( payload, );
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
					result.current[ 1 ].cta.replace( payload, );
					result.current[ 1 ].cta.replaceInitial( payload, );
				}, );

				expect( result.current[ 0 ], ).toEqual( payload, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
				expect( result.current[ 1 ].state.initial, ).toEqual( payload, );
			}, );
		}, );

		describe( 'dispatch.cta.reset', function() {
			test( 'should reset to use `initial`', function() {
				const payload = {
					hi: 2,
				};
				const { result, } = renderHook( () => useCTA( {
					initial,
				}, ), );

				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload,
					}, );
				}, );

				expect( result.current[ 0 ], ).toEqual( {
					...initial,
					...payload,
				}, );
				expect( result.current[ 1 ].state.changes, ).toEqual( payload, );

				act( () => {
					result.current[ 1 ].cta.reset();
				}, );

				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
			}, );

			test( 'should reset to use `initial` when custom action is defined', function() {
				const payload = {
					hi: 2,
				};
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						customAction() {
							return undefined;
						},
					},
				}, ), );

				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload,
					}, );
				}, );

				expect( result.current[ 0 ], ).toEqual( {
					...initial,
					...payload,
				}, );
				expect( result.current[ 1 ].state.changes, ).toEqual( payload, );

				act( () => {
					result.current[ 1 ].cta.reset();
				}, );

				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
			}, );

			test( 'should reset using `init` result', function() {
				const payload = {
					hi: 2,
				};
				const initExtra = {
					oops: 'my mistake',
				};
				const { result, } = renderHook( () => useCTA( {
					initial,
					onInit( state, ) {
						return {
							...state,
							...initExtra,
						};
					},
				}, ), );

				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload,
					}, );
				}, );

				expect( result.current[ 0 ], ).toEqual( {
					...initial,
					...initExtra,
					...payload,
				}, );
				expect( result.current[ 1 ].state.changes, ).toEqual( payload, );

				act( () => {
					result.current[ 1 ].cta.reset();
				}, );

				expect( result.current[ 0 ], ).toEqual( {
					...initial,
					...initExtra,
				}, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
			}, );

			test( 'should reset using `init` and custom action is defined', function() {
				const payload = {
					hi: 2,
				};
				const initExtra = {
					oops: 'my mistake',
				};
				const { result, } = renderHook( () => useCTA( {
					initial,
					onInit( state, ) {
						return {
							...state,
							...initExtra,
						};
					},
					actions: {
						customAction() {
							return undefined;
						},
					},
				}, ), );

				act( () => {
					result.current[ 1 ]( {
						type: 'update',
						payload,
					}, );
				}, );

				expect( result.current[ 0 ], ).toEqual( {
					...initial,
					...initExtra,
					...payload,
				}, );
				expect( result.current[ 1 ].state.changes, ).toEqual( payload, );

				act( () => {
					result.current[ 1 ].cta.reset();
				}, );

				expect( result.current[ 0 ], ).toEqual( {
					...initial,
					...initExtra,
				}, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
			}, );

			describe( 'dispatch.cta.reset( initial | ( (state) => initial | undefined ) )', function() {
				test( 'should set new `initial` to be `payload`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
					}, ), );

					act( () => {
						result.current[ 1 ].cta.reset( payload, );
					}, );

					expect( result.current[ 0 ], ).toEqual( payload, );
					expect( result.current[ 1 ].state.changes, ).toBeNull();
					expect( result.current[ 1 ].state.initial, ).toEqual( payload, );
					expect( result.current[ 1 ].state.previous, ).toEqual( initial, );
				}, );

				test( 'should set new `initial` when `payload` is a function and returns a new state', function() {
					const payload = {
						there: 'me',
						hi: 1,
						you: 'yes, you.',
						2: 22,
					};
					const { result, } = renderHook( () => useCTA( {
						initial,
					}, ), );

					act( () => {
						result.current[ 1 ].cta.reset( () => payload, );
					}, );

					expect( result.current[ 0 ], ).toEqual( payload, );
					expect( result.current[ 1 ].state.changes, ).toBeNull();
					expect( result.current[ 1 ].state.initial, ).toEqual( payload, );
					expect( result.current[ 1 ].state.previous, ).toEqual( initial, );
				}, );

				test( 'should set new `initial` when `payload` is a function that returns state with `{"arbitrary key": "value"}`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
					}, ), );

					act( () => {
						result.current[ 1 ].cta.reset( () => payloadWithArbitraryKey, );
					}, );

					expect( result.current[ 0 ], ).toEqual( payloadWithArbitraryKey, );
					expect( result.current[ 1 ].state.changes, ).toBeNull();
					expect( result.current[ 1 ].state.initial, ).toEqual( payloadWithArbitraryKey, );
					expect( result.current[ 1 ].state.previous, ).toEqual( initial, );

					act( () => {
						result.current[ 1 ].cta.replace( initial, );
					}, );

					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
						...arbitraryKey,
						...initialChanges,
					}, );
					expect( result.current[ 1 ].state.initial, ).toEqual( payloadWithArbitraryKey, );
					expect( result.current[ 1 ].state.previous, ).toEqual( payloadWithArbitraryKey, );
				}, );

				test( 'should not set new `initial` when `payload` is a function that returns `undefined`', function() {
					const payload = undefined;
					const { result, } = renderHook( () => useCTA( {
						initial,
					}, ), );
					const newInitial = {
						...initial,
						there: 'newInitial',
					};

					act( () => {
						result.current[ 1 ].cta.replaceInitial( newInitial, );
					}, );

					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
						there: initial.there,
					}, );
					expect( result.current[ 1 ].state.initial, ).toEqual( newInitial, );

					act( () => {
						result.current[ 1 ].cta.reset( () => payload, );
					}, );

					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
						there: initial.there,
					}, );
					expect( result.current[ 1 ].state.initial, ).toEqual( newInitial, );
				}, );

				test( 'should not set new `initial` when `payload` = `initial`', function() {
					const payload = {
						there: 'me',
						hi: 1,
						you: 'yes, you.',
						2: 22,
					};
					const { result, } = renderHook( () => useCTA( {
						initial,
					}, ), );

					act( () => {
						result.current[ 1 ].cta.reset( () => payload, );
					}, );

					expect( result.current[ 0 ], ).toEqual( payload, );
					expect( result.current[ 1 ].state.changes, ).toBeNull();
					expect( result.current[ 1 ].state.initial, ).toEqual( payload, );
					expect( result.current[ 1 ].state.previous, ).toEqual( initial, );
				}, );

				test( 'should set new `initial` to be `payload` when custom action is defined', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							customAction() {
								return undefined;
							},
						},
					}, ), );

					act( () => {
						result.current[ 1 ].cta.reset( payload, );
					}, );

					expect( result.current[ 0 ], ).toEqual( payload, );
					expect( result.current[ 1 ].state.changes, ).toBeNull();
					expect( result.current[ 1 ].state.initial, ).toEqual( payload, );
				}, );
			}, );
		}, );

		describe( 'dispatch.cta.update', function() {
			describe( 'dispatch.cta.update( partialState | ( state => partialState | undefined ))', function() {
				test( 'should `update` `hi`', function() {
					const payload = {
						hi: 2,
					};
					const { result, } = renderHook( () => useCTA( {
						initial,
					}, ), );

					act( () => {
						result.current[ 1 ].cta.update( payload, );
					}, );

					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						...payload,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( payload, );

					act( () => {
						result.current[ 1 ].cta.update( initial, );
					}, );

					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull();
				}, );

				test( 'should `update` `there`', function() {
					const payload = {
						there: 'me',
					};
					const { result, } = renderHook( () => useCTA( {
						initial,
					}, ), );

					act( () => {
						result.current[ 1 ].cta.update( payload, );
					}, );

					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						...payload,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( payload, );

					act( () => {
						result.current[ 1 ].cta.update( initial, );
					}, );

					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull();
				}, );

				test( 'should `update` `you` and `there`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
					}, ), );

					act( () => {
						result.current[ 1 ].cta.update( changes, );
					}, );

					expect( result.current[ 0 ], ).toEqual( payload, );
					expect( result.current[ 1 ].state.changes, ).toEqual( changes, );

					act( () => {
						result.current[ 1 ].cta.update( initial, );
					}, );

					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull();
				}, );

				test( 'should `update` when `payload` is function', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
					}, ), );

					act( () => {
						result.current[ 1 ].cta.update( () => changes, );
					}, );

					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						...changes,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( changes, );

					act( () => {
						result.current[ 1 ].cta.update( initial, );
					}, );

					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull();
				}, );

				test( 'should not `update` when `payload` is function that returns `undefined`', function() {
					const payload = undefined;
					const { result, } = renderHook( () => useCTA( {
						initial,
					}, ), );

					act( () => {
						result.current[ 1 ].cta.update( () => payload, );
					}, );

					expect( result.current[ 0 ] === initial, ).toBe( true, );
					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull();
				}, );

				test( 'should not `update` when `payload` does not change state', function() {
					const payload = { hi: 1, };
					const { result, } = renderHook( () => useCTA( {
						initial,
					}, ), );

					act( () => {
						result.current[ 1 ].cta.update( payload, );
					}, );

					expect( result.current[ 0 ] === initial, ).toBe( true, );
					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull();
				}, );

				test( 'should `update` `hi` when custom action is defined', function() {
					const payload = {
						hi: 2,
					};
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
					}, );

					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						...payload,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( payload, );

					act( () => {
						result.current[ 1 ].cta.update( initial, );
					}, );

					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull();
				}, );
			}, );

			describe( 'dispatch.cta.update(key, value)', function() {
				test( 'should `update` `hi`', function() {
					const payload = {
						hi: 2,
					};
					const { result, } = renderHook( () => useCTA( {
						initial,
					}, ), );

					act( () => {
						result.current[ 1 ].cta.update( 'hi', payload.hi, );
					}, );

					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						...payload,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( payload, );

					act( () => {
						result.current[ 1 ].cta.update( initial, );
					}, );

					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull();
				}, );

				test( 'should not `update` `hi`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
					}, ), );

					act( () => {
						result.current[ 1 ].cta.update( 'hi', initial.hi, );
					}, );

					expect( result.current[ 0 ] === initial, ).toBe( true, );
					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull();
				}, );

				test( 'should update `there`', function() {
					const payload = {
						there: 'me',
					};
					const { result, } = renderHook( () => useCTA( {
						initial,
					}, ), );

					act( () => {
						result.current[ 1 ].cta.update( 'there', payload.there, );
					}, );

					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						...payload,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( payload, );

					act( () => {
						result.current[ 1 ].cta.update( initial, );
					}, );

					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull();
				}, );

				test( 'should update `2`', function() {
					const payload = {
						2: 222,
					};
					const { result, } = renderHook( () => useCTA( {
						initial,
					}, ), );

					act( () => {
						result.current[ 1 ].cta.update( 2, payload[ 2 ], );
					}, );

					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						...payload,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( payload, );

					act( () => {
						result.current[ 1 ].cta.update( initial, );
					}, );

					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull();
				}, );

				test( 'should `update` `hi` when custom action is defined', function() {
					const payload = {
						hi: 2,
					};
					const { result, } = renderHook( () => useCTA( {
						initial,
					}, ), );

					act( () => {
						result.current[ 1 ].cta.update( 'hi', payload.hi, );
					}, );

					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						...payload,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( payload, );

					act( () => {
						result.current[ 1 ].cta.update( initial, );
					}, );

					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull();
				}, );
			}, );
		}, );
	}, );

	describe( 'unknown type', function() {
		test( 'should not change state', function() {
			const payload = 'not updating';
			const { result, } = renderHook( () => useCTA( {
				initial,
			}, ), );

			act( () => {
				result.current[ 1 ]( {
					// @ts-expect-error force payload to test no state change
					type: 'arbitrary type',
					// @ts-expect-error force payload to test no state change
					payload,
				}, );
			}, );

			expect( result.current[ 0 ] === initial, ).toBe( true, );
			expect( result.current[ 0 ], ).toEqual( initial, );
			expect( result.current[ 1 ].state.changes, ).toBeNull( );
		}, );

		test( 'should not change state when custom action is defined', function() {
			const payload = 'not updating';
			const { result, } = renderHook( () => useCTA( {
				initial,
				actions: {
					customAction() {
						return undefined;
					},
				},
			}, ), );

			act( () => {
				result.current[ 1 ]( {
					// @ts-expect-error force payload to test no state change
					type: 'arbitrary type',
					// @ts-expect-error force payload to test no state change
					payload,
				}, );
			}, );

			expect( result.current[ 0 ] === initial, ).toBe( true, );
			expect( result.current[ 0 ], ).toEqual( initial, );
			expect( result.current[ 1 ].state.changes, ).toBeNull( );
		}, );
	}, );

	describe( 'custom actions', function() {
		test( 'should not create a new dispatch when an action is called', () => {
			const { result, } = renderHook( () => useCTA( {
				initial,
				actions: {
					customAction() {
						return {
							hi: 999,
						};
					},
				},
			}, ), );
			const [
				,
				initDispatch,
			] = result.current;

			act( () => {
				result.current[ 1 ].cta.customAction();
			}, );

			expect( initDispatch, ).toEqual( result.current[ 1 ], );
		}, );

		describe( 'calc', function() {
			const actions = returnActionsType( initial, {
				calc( state, payload: Pick<typeof initial, 'hi'>, ) {
					const {
						hi,
					} = payload;

					if ( state.options?.ignoreNegatives ) {
						return;
					}

					if ( typeof hi !== 'number' ) {
						return;
					}

					return {
						hi: state.previous.hi + hi,
					};
				},
				update( ctaStateParam, payload, ) {
					return payload;
				},
			}, );

			describe( 'dispatch({type: "calc", payload: unknown}})', () => {
				test( 'should `calc` `hi`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions,
					}, ), );

					const payload = {
						hi: 4,
					};
					act( () => {
						result.current[ 1 ]( {
							type: 'calc',
							payload,
						}, );
					}, );
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi + payload.hi,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
						hi: initial.hi + payload.hi,
					}, );
				}, );

				test( 'should not `calc` `hi`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions,
					}, ), );

					const payload = {
						hi: '',
					};
					act( () => {
						result.current[ 1 ]( {
							type: 'calc',
							// @ts-expect-error make sure payload is not used by calc when payload is forced
							payload,
						}, );
					}, );

					expect( result.current[ 0 ] === initial, ).toBe( true, );
					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull( );
				}, );

				test( 'should `calc` `hi` when `payload` is function', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions,
					}, ), );

					const payload = {
						hi: 4,
					};
					act( () => {
						result.current[ 1 ]( {
							type: 'calc',
							payload,
						}, );
					}, );
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi + payload.hi,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
						hi: initial.hi + payload.hi,
					}, );
				}, );

				test( 'should not `calc` `hi` when `payload` is function that returns `undefined`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions,
					}, ), );

					act( () => {
						result.current[ 1 ]( {
							type: 'calc',
							payload: () => undefined,
						}, );
					}, );

					expect( result.current[ 0 ] === initial, ).toBe( true, );
					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull( );
				}, );

				test( 'should not `calc` when `payload` is negative and `options.ignoreNegatives` === true', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions,
					}, ), );

					const payload = {
						hi: -4,
					};
					act( () => {
						result.current[ 1 ]( {
							type: 'calc',
							payload,
							options: {
								ignoreNegatives: true,
							},
						}, );
					}, );
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi,
					}, );
					expect( result.current[ 1 ].state.changes, ).toBeNull( );
				}, );
			}, );
			describe( 'dispatch.cta.calc( unknown )', function() {
				test( 'should `calc` `hi`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions,
					}, ), );

					const val = {
						hi: 4,
					};
					act( () => {
						result.current[ 1 ].cta.calc( val, );
					}, );
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi + val.hi,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
						hi: initial.hi + val.hi,
					}, );
				}, );

				test( 'should not `calc` `hi`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions,
					}, ), );

					const payload = {
						there: '',
					};
					act( () => {
						// @ts-expect-error make sure payload is not used by calc when payload is forced
						result.current[ 1 ].cta.calc( payload, );
					}, );

					expect( result.current[ 0 ] === initial, ).toBe( true, );
					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull( );
				}, );

				test( 'should `calc` `hi` when `payload` is function', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions,
					}, ), );

					const payload = {
						hi: 4,
					};
					act( () => {
						result.current[ 1 ].cta.calc( () => payload, );
					}, );
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi + payload.hi,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
						hi: initial.hi + payload.hi,
					}, );
				}, );

				test( 'should not `calc` `hi` when `payload` is function that returns `undefined`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions,
					}, ), );

					act( () => {
						result.current[ 1 ].cta.calc( () => undefined, );
					}, );

					expect( result.current[ 0 ] === initial, ).toBe( true, );
					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull( );
				}, );

				test( 'should not `calc` when `payload` is negative and `options.ignoreNegatives` === true', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions,
					}, ), );

					const payload = {
						hi: -4,
					};
					const options = {
						ignoreNegatives: true,
					};
					act( () => {
						result.current[ 1 ].cta.calc( payload, options, );
					}, );
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi,
					}, );
					expect( result.current[ 1 ].state.changes, ).toBeNull( );
				}, );
			}, );
		}, );

		describe( 'doubleHi', function() {
			const actions = returnActionsType( initial, {
				double( state, ) {
					if ( state.options?.ignore ) {
						return;
					}
					return {
						hi: state.previous.hi * 2,
					};
				},
			}, );

			describe( 'dispatch({type: "doubleHi"}})', () => {
				test( 'should double `hi`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions,
					}, ), );

					act( () => {
						result.current[ 1 ]( {
							type: 'double',
						}, );
					}, );
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi * 2,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
						hi: initial.hi * 2,
					}, );
				}, );

				test( 'should not double `hi` when `options.ignore` === true', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions,
					}, ), );

					act( () => {
						result.current[ 1 ]( {
							type: 'double',
							options: {
								ignore: true,
							},
						}, );
					}, );
					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull( );
				}, );
			}, );
			describe( 'dispatch.double', function() {
				test( 'should double `hi`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions,
					}, ), );

					act( () => {
						result.current[ 1 ].cta.double();
					}, );
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi * 2,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
						hi: initial.hi * 2,
					}, );
				}, );

				test( 'should not double `hi` when `options.ignore` === true', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions,
					}, ), );

					act( () => {
						result.current[ 1 ].cta.double( undefined, { ignore: true, }, );
					}, );
					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull( );
				}, );
			}, );
		}, );

		describe( 'val', function() {
			describe( 'dispatch({type: "val", payload: unknown})', () => {
				test( 'should add to `hi`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							val( state, payload: Pick<typeof initial, 'hi'>['hi'], ) {
								return {
									hi: state.previous.hi + payload,
								};
							},
						},
					}, ), );

					const payload = 4;
					act( () => {
						result.current[ 1 ]( {
							type: 'val',
							payload,
						}, );
					}, );
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi + payload,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
						hi: initial.hi + payload,
					}, );
				}, );

				test( 'should not add to `hi` if payload is not a number', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							val( state, payload: Pick<typeof initial, 'hi'>['hi'], ) {
								if ( typeof payload !== 'number' ) {
									return;
								}
								return {
									hi: state.previous.hi + payload,
								};
							},
						},
					}, ), );

					const payload = 's';
					act( () => {
						result.current[ 1 ]( {
							type: 'val',
							// @ts-expect-error make sure payload is not used by calc when payload is forced
							payload,
						}, );
					}, );
					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull();
				}, );

				test( 'should add to `hi` when payload is a function', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							val( state, payload: Pick<typeof initial, 'hi'>['hi'], ) {
								return {
									hi: state.previous.hi + payload,
								};
							},
						},
					}, ), );

					const payload = () => 4;
					act( () => {
						result.current[ 1 ]( {
							type: 'val',
							payload,
						}, );
					}, );
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi + payload(),
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
						hi: initial.hi + payload(),
					}, );
				}, );

				test( 'should not add to `hi` when payload is a function that returns a string', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							val( state, payload: Pick<typeof initial, 'hi'>['hi'], ) {
								if ( typeof payload !== 'number' ) {
									return;
								}
								return {
									hi: state.previous.hi + payload,
								};
							},
						},
					}, ), );

					const payload = () => 'sdd';
					act( () => {
						result.current[ 1 ]( {
							type: 'val',
							// @ts-expect-error make sure payload is not used by calc when payload is forced
							payload,
						}, );
					}, );
					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull( );
				}, );
				test( 'should add to `hi` when payload is a function that returns `undefined`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							val( state, payload: Pick<typeof initial, 'hi'>['hi'], ) {
								return {
									hi: state.previous.hi + payload,
								};
							},
						},
					}, ), );

					const payload = () => undefined;
					act( () => {
						result.current[ 1 ]( {
							type: 'val',
							payload,
						}, );
					}, );
					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull( );
				}, );
			}, );

			describe( 'dispatch.cta.val(unknown)', function() {
				test( 'should add to `hi`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							val( state, payload: Pick<typeof initial, 'hi'>['hi'], ) {
								return {
									hi: state.previous.hi + payload,
								};
							},
						},
					}, ), );

					const payload = 4;
					act( () => {
						result.current[ 1 ].cta.val( payload, );
					}, );
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi + payload,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
						hi: initial.hi + payload,
					}, );
				}, );

				test( 'should add to `hi` when payload is a function', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							val( state, payload: Pick<typeof initial, 'hi'>['hi'], ) {
								return {
									hi: state.previous.hi + payload,
								};
							},
						},
					}, ), );

					const payload = () => 4;
					act( () => {
						result.current[ 1 ].cta.val( payload, );
					}, );
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: initial.hi + payload(),
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
						hi: initial.hi + payload(),
					}, );
				}, );

				test( 'should add to `hi` when payload is a function that returns `undefined`', function() {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							val( state, payload: Pick<typeof initial, 'hi'>['hi'], ) {
								return {
									hi: state.previous.hi + payload,
								};
							},
						},
					}, ), );

					const payload = () => undefined;
					act( () => {
						result.current[ 1 ].cta.val( payload, );
					}, );
					expect( result.current[ 0 ], ).toEqual( initial, );
					expect( result.current[ 1 ].state.changes, ).toBeNull( );
				}, );
			}, );
		}, );

		describe( 'without arguments', function() {
			describe( 'dispatch({type: "updateSome"})', () => {
				test( 'should update some values', () => {
					const newValues = {
						you: 'will work',
						there: 'right?',
					};
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							updateSome() {
								return newValues;
							},
						},
					}, ), );

					act( () => {
						result.current[ 1 ]( {
							type: 'updateSome',
						}, );
					}, );
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						...newValues,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( newValues, );
				}, );
			}, );

			describe( 'dispatch.cta.updateSome()', () => {
				test( 'should update some values', () => {
					const newValues = {
						you: 'will work',
						there: 'right?',
					};
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							updateSome() {
								return newValues;
							},
						},
					}, ), );

					act( () => {
						result.current[ 1 ].cta.updateSome();
					}, );
					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						...newValues,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( newValues, );
				}, );
			}, );
		}, );

		describe( 'with invalid results', () => {
			test( 'should not make changes when type is `invalid`', () => {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						double( state, ) {
							return [
								'invalid',
								{
									...state.current,
									hi: 33333,
								},
							];
						},
					},
				}, ), );

				act( () => {
					// @ts-expect-error check to make sure this does not make changes with invalid type
					result.current[ 1 ].cta.double();
				}, );
				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBeNull( );
			}, );

			test( 'should not make changes when next state is `invalid`', () => {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						double( state, ) {
							// @ts-expect-error check to make sure this does not make changes with invalid type
							return state.replaceAction( 'invalid', );
						},
					},
				}, ), );

				act( () => {
					result.current[ 1 ].cta.double();
				}, );
				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBeNull( );
			}, );
		}, );

		describe( 'replaceAction', () => {
			const nextStatePartial = {
				hi: 7,
				there: 'replaceAction',
			};

			const actions = returnActionsType( initial, {
				replace( ctaState, payload, ) {
					return {
						...payload,
						you: payload.there === 'replaceAction' ? 'done' : ctaState.current.you,
					};
				},
			}, );

			test( 'should use augmented `replace`', () => {
				const nextChange = {
					...nextStatePartial,
					you: 'done',
				};
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						...actions,
						custom( state, ) {
							return state.replaceAction( {
								...state.current,
								...nextStatePartial,
							}, );
						},
					},
				}, ), );
				const nextState = {
					...initial,
					...nextChange,
				};

				act( () => {
					result.current[ 1 ].cta.custom();
				}, );

				expect( result.current[ 0 ], ).toEqual( nextState, );
				expect( result.current[ 1 ].state.changes, ).toEqual( nextChange, );
				expect( result.current[ 1 ].state.current, ).toEqual( nextState, );
				expect( result.current[ 1 ].state.initial, ).toEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toEqual( initial, );
			}, );

			test( 'should not use augmented `replace`', () => {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						...actions,
						custom( state, ) {
							return state.replaceAction(
								{
									...state.current,
									...nextStatePartial,
								},
								{
									useDefault: true,
								},
							);
						},
					},
				}, ), );
				const nextState = {
					...initial,
					...nextStatePartial,
				};

				act( () => {
					result.current[ 1 ].cta.custom();
				}, );

				expect( result.current[ 0 ], ).toEqual( nextState, );
				expect( result.current[ 1 ].state.changes, ).toEqual( nextStatePartial, );
				expect( result.current[ 1 ].state.current, ).toEqual( nextState, );
				expect( result.current[ 1 ].state.initial, ).toEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toEqual( initial, );
			}, );
		}, );

		describe( 'replaceInitialAction', () => {
			const nextStatePartial = {
				hi: 7,
				there: 'replaceInitialAction',
			};

			const actions = returnActionsType( initial, {
				replaceInitial( ctaState, payload, ) {
					return {
						...payload,
						you: payload.there === 'replaceInitialAction' ? 'done' : ctaState.current.you,
					};
				},
			}, );

			test( 'should use augmented `replaceInitial`', () => {
				const nextChange = {
					...nextStatePartial,
					you: 'done',
				};
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						...actions,
						custom( state, ) {
							return state.replaceInitialAction( {
								...state.current,
								...nextStatePartial,
							}, );
						},
					},
				}, ), );
				const nextState = {
					...initial,
					...nextChange,
				};

				act( () => {
					result.current[ 1 ].cta.custom();
				}, );

				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toEqual( {
					hi: initial.hi,
					there: initial.there,
					you: initial.you,
				}, );
				expect( result.current[ 1 ].state.current, ).toEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toEqual( nextState, );
				expect( result.current[ 1 ].state.previous, ).toEqual( initial, );
			}, );

			test( 'should not use augmented `replaceInitial`', () => {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						...actions,
						custom( state, ) {
							return state.replaceInitialAction(
								{
									...state.current,
									...nextStatePartial,
								},
								{
									useDefault: true,
								},
							);
						},
					},
				}, ), );
				const nextState = {
					...initial,
					...nextStatePartial,
				};

				act( () => {
					result.current[ 1 ].cta.custom();
				}, );

				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toEqual( {
					hi: initial.hi,
					there: initial.there,
				}, );
				expect( result.current[ 1 ].state.current, ).toEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toEqual( nextState, );
				expect( result.current[ 1 ].state.previous, ).toEqual( initial, );
			}, );
		}, );

		describe( 'resetAction', () => {
			const nextStatePartial = {
				hi: 7,
				there: 'resetAction',
			};
			const emptyPayload = {
				2: 999,
				hi: 999,
				there: 'augmented reset',
				you: 'augmented reset',
			};
			const actions = returnActionsType( initial, {
				reset( ctaState, payload, ) {
					if ( !payload ) {
						return emptyPayload;
					}
					return {
						...payload,
						you: payload.there === 'resetAction' ? 'done' : ctaState.current.you,
					};
				},
			}, );

			test( 'should use augmented `reset`', () => {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						...actions,
						custom( state, ) {
							return state.resetAction();
						},
					},
				}, ), );

				act( () => {
					result.current[ 1 ].cta.custom();
				}, );

				expect( result.current[ 0 ], ).toEqual( emptyPayload, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
				expect( result.current[ 1 ].state.current, ).toEqual( emptyPayload, );
				expect( result.current[ 1 ].state.initial, ).toEqual( emptyPayload, );
				expect( result.current[ 1 ].state.previous, ).toEqual( initial, );
			}, );

			test( 'should not trigger with invalid `payload`', () => {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						...actions,
						custom( state, ) {
							// @ts-expect-error check that it doesn't trigger for invalid `payload`
							return state.resetAction( [], );
						},
					},
				}, ), );

				act( () => {
					result.current[ 1 ].cta.custom();
				}, );

				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
				expect( result.current[ 1 ].state.current, ).toEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toEqual( initial, );
			}, );

			test( 'should not trigger with `payload = null`', () => {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						...actions,
						custom( state, ) {
							// @ts-expect-error check that it doesn't trigger for invalid `payload`
							return state.resetAction( null, );
						},
					},
				}, ), );

				act( () => {
					result.current[ 1 ].cta.custom();
				}, );

				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
				expect( result.current[ 1 ].state.current, ).toEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toEqual( initial, );
			}, );

			test( 'should use augmented `reset` with payload', () => {
				const nextState = {
					...initial,
					...nextStatePartial,
				};
				const next = {
					...nextState,
					you: 'done',
				};
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						...actions,
						custom( state, ) {
							return state.resetAction( nextState, );
						},
					},
				}, ), );

				act( () => {
					result.current[ 1 ].cta.custom();
				}, );

				expect( result.current[ 0 ], ).toEqual( next, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
				expect( result.current[ 1 ].state.current, ).toEqual( next, );
				expect( result.current[ 1 ].state.initial, ).toEqual( next, );
				expect( result.current[ 1 ].state.previous, ).toEqual( initial, );
			}, );

			test( 'should not use augmented `reset`', () => {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						...actions,
						custom( state, ) {
							return state.resetAction(
								undefined,
								{
									useDefault: true,
								},
							);
						},
					},
				}, ), );

				act( () => {
					result.current[ 1 ].cta.custom();
				}, );

				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
				expect( result.current[ 1 ].state.current, ).toEqual( initial, );
				expect( result.current[ 1 ].state.initial, ).toEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toEqual( initial, );
			}, );

			test( 'should not use augmented `reset` with `payload`', () => {
				const nextState = {
					...initial,
					...nextStatePartial,
				};

				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						...actions,
						custom( state, ) {
							return state.resetAction(
								nextState,
								{
									useDefault: true,
								},
							);
						},
					},
				}, ), );

				act( () => {
					result.current[ 1 ].cta.custom();
				}, );

				expect( result.current[ 0 ], ).toEqual( nextState, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
				expect( result.current[ 1 ].state.current, ).toEqual( nextState, );
				expect( result.current[ 1 ].state.initial, ).toEqual( nextState, );
				expect( result.current[ 1 ].state.previous, ).toEqual( initial, );
			}, );
		}, );

		describe( 'updateAction', () => {
			const nextStatePartial = {
				hi: 7,
				there: 'updateAction',
			};
			const actions = returnActionsType( initial, {
				update( ctaState, payload, ) {
					return {
						...payload,
						you: payload.there === 'updateAction' ? 'done' : ctaState.current.you,
					};
				},
			}, );

			test( 'should use augmented `update`', () => {
				const nextChange = {
					...nextStatePartial,
					you: 'done',
				};
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						...actions,
						custom( state, ) {
							return state.updateAction( nextStatePartial, );
						},
					},
				}, ), );
				const nextState = {
					...initial,
					...nextChange,
				};
				act( () => {
					result.current[ 1 ].cta.custom();
				}, );
				expect( result.current[ 0 ], ).toEqual( nextState, );
				expect( result.current[ 1 ].state.changes, ).toEqual( nextChange, );
				expect( result.current[ 1 ].state.current, ).toEqual( nextState, );
				expect( result.current[ 1 ].state.initial, ).toEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toEqual( initial, );
			}, );

			test( 'should not use augmented `update`', () => {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: {
						...actions,
						custom( state, ) {
							return state.updateAction( nextStatePartial, { useDefault: true, }, );
						},
					},
				}, ), );
				const nextState = {
					...initial,
					...nextStatePartial,
				};
				act( () => {
					result.current[ 1 ].cta.custom();
				}, );
				expect( result.current[ 0 ], ).toEqual( nextState, );
				expect( result.current[ 1 ].state.changes, ).toEqual( nextStatePartial, );
				expect( result.current[ 1 ].state.current, ).toEqual( nextState, );
				expect( result.current[ 1 ].state.initial, ).toEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toEqual( initial, );
			}, );
		}, );

		describe( 'augment `update`', function() {
			const customUpdateActions = returnActionsType( initial, {
				update( state, payload: Partial<typeof initial>, ) {
					const {
						hi,
						..._payload
					} = payload;

					if ( typeof hi !== 'number' ) {
						return _payload;
					}

					if ( state.options?.tripleHi ) {
						return {
							..._payload,
							hi: ( state.previous.hi + hi ) * 3,
						};
					}

					return {
						..._payload,
						hi: state.previous.hi + hi,
					};
				},
			}, );

			test( 'should `dispatch.cta.update("hi", number)`', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: customUpdateActions,
				}, ), );

				const payload = {
					hi: 4,
				};
				const hi = initial.hi + payload.hi;
				act( () => {
					result.current[ 1 ].cta.update( 'hi', payload.hi, );
				}, );
				expect( result.current[ 0 ], ).toEqual( {
					...initial,
					hi,
				}, );
				expect( result.current[ 1 ].state.changes, ).toEqual( {
					hi,
				}, );
			}, );

			test( 'should `dispatch.cta.update("hi", number, { tripleHi: true, })`', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: customUpdateActions,
				}, ), );

				const payload = {
					hi: 4,
				};
				const hi = ( initial.hi + payload.hi ) * 3;
				act( () => {
					result.current[ 1 ].cta.update( 'hi', payload.hi, { tripleHi: true, }, );
				}, );
				expect( result.current[ 0 ], ).toEqual( {
					...initial,
					hi,
				}, );
				expect( result.current[ 1 ].state.changes, ).toEqual( {
					hi,
				}, );
			}, );

			test( 'should `dispatch.cta.update("there", string, { tripleHi: true, })` without changing `hi`', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions: customUpdateActions,
				}, ), );
				const there = 'there';
				const payload = {
					there,
				};
				act( () => {
					result.current[ 1 ].cta.update( 'there', payload.there, );
				}, );
				expect( result.current[ 0 ], ).toEqual( {
					...initial,
					there,
				}, );
				expect( result.current[ 1 ].state.changes, ).toEqual( {
					there,
				}, );
			}, );

			describe( 'and include custom action', () => {
				test( 'should use override update', () => {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							...customUpdateActions,
							addHi( state, ) {
								return {
									hi: state.previous.hi,
								};
							},
						},
					}, ), );
					const newHi = result.current[ 1 ].state.current.hi * 2;
					act( () => {
						result.current[ 1 ].cta.addHi();
					}, );

					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: newHi,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
						hi: newHi,
					}, );
				}, );

				test( 'should not use override update', () => {
					const { result, } = renderHook( () => useCTA( {
						initial,
						actions: {
							...customUpdateActions,
							addHi( state, ) {
								return state.updateAction(
									{
										hi: state.current.hi * 3,
									},
									{ useDefault: true, },
								);
							},
						},
					}, ), );

					const newHi = result.current[ 1 ].state.current.hi * 3;
					act( () => {
						result.current[ 1 ].cta.addHi();
					}, );

					expect( result.current[ 0 ], ).toEqual( {
						...initial,
						hi: newHi,
					}, );
					expect( result.current[ 1 ].state.changes, ).toEqual( {
						hi: newHi,
					}, );
				}, );
			}, );
		}, );

		describe( 'augment `reset`', function() {
			const payloadMissingPartial = {
				there: 'reset',
			};
			const payloadExceptionPartial = {
				hi: 99,
			};
			const customResetUpdate = {
				...initial,
				...payloadMissingPartial,
			};
			const actions = returnActionsType( initial, {
				reset( state, payload, ) {
					if ( !payload || typeof payload !== 'object' ) {
						const resetPayload = {
							...state.initial,
							...payloadMissingPartial,
						};

						if ( state.options?.exceptionHi ) {
							return {
								...resetPayload,
								...payloadExceptionPartial,
							};
						}

						return resetPayload;
					}

					if ( payload.hi < 0 ) {
						return;
					}

					return payload;
				},
			}, );

			test( 'should `reset` when payload is nil', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions,
				}, ), );

				act( () => {
					result.current[ 1 ].cta.reset();
				}, );

				expect( result.current[ 0 ], ).toEqual( customResetUpdate, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
				expect( result.current[ 1 ].state.initial, ).toEqual( customResetUpdate, );
				expect( result.current[ 1 ].state.previous, ).toEqual( initial, );
			}, );

			test( 'should not `reset` when payload function returns `undefined`', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions,
				}, ), );

				act( () => {
					result.current[ 1 ].cta.reset( () => undefined, );
				}, );

				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
				expect( result.current[ 1 ].state.initial, ).toEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toEqual( initial, );
			}, );

			test( 'should reset when payload function returns new state', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions,
				}, ), );
				const partialNewState = {
					2: 999,
				};
				const newState = {
					...initial,
					...partialNewState,
				};

				act( () => {
					result.current[ 1 ].cta.reset( newState, );
				}, );

				expect( result.current[ 0 ], ).toEqual( newState, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
				expect( result.current[ 1 ].state.initial, ).toEqual( newState, );
				expect( result.current[ 1 ].state.previous, ).toEqual( initial, );

				act( () => {
					result.current[ 1 ].cta.reset( ctaPayloadCallbackParameter => ctaPayloadCallbackParameter.current, );
				}, );

				expect( result.current[ 0 ], ).toEqual( newState, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
				expect( result.current[ 1 ].state.initial, ).toEqual( newState, );
				expect( result.current[ 1 ].state.previous, ).toEqual( initial, );
			}, );

			test( 'should keep current `hi` with `options.exceptionHi`', function() {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions,
				}, ), );

				act( () => {
					result.current[ 1 ].cta.reset( undefined, { exceptionHi: true, }, );
				}, );

				expect( result.current[ 0 ], ).toEqual( {
					...customResetUpdate,
					...payloadExceptionPartial,
				}, );
			}, );

			test( 'should not have changes if hi < 0', () => {
				const { result, } = renderHook( () => useCTA( {
					initial,
					actions,
				}, ), );

				act( () => {
					result.current[ 1 ].cta.reset( ctaParam => ( { ...ctaParam.initial,
						hi: -1, } ), );
				}, );

				expect( result.current[ 0 ], ).toEqual( initial, );
				expect( result.current[ 1 ].state.changes, ).toBeNull();
				expect( result.current[ 1 ].state.initial, ).toEqual( initial, );
				expect( result.current[ 1 ].state.previous, ).toEqual( initial, );
			}, );
		}, );
	}, );
}, );
