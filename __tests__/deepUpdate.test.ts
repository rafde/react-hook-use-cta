import { act, renderHook, } from '@testing-library/react';
import { describe, test, expect, } from 'vitest';
import { useCTA, } from '../src';
import { nestedInitial, } from './setup/simple';

describe( 'dispatch.cta.deepUpdate', () => {
	const initial = nestedInitial;

	test( 'updates a deep property with nested partial', () => {
		const changes = {
			user: {
				profile: {
					name: 'Jon',
					contacts: [
						{ type: 'email',
							value: 'john.doe@example.com', },
						{ type: 'phone',
							value: '777-777-7777', },
					],
					1: {
						'the.me.s': {
							mode: 'light' as 'light' | 'dark',
						},
					},
				},
				metadata: {
					visits: 99,
				},
			},
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );

		act( () => {
			result.current[ 1 ].cta.deepUpdate( changes, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( {
			...initial,
			user: {
				...initial.user,
				profile: {
					...changes.user.profile,
					1: {
						...initial.user.profile[ 1 ],
						'the.me.s': {
							...initial.user.profile[ 1 ][ 'the.me.s' ],
							...changes.user.profile[ 1 ][ 'the.me.s' ],
						},
					},
				},
				metadata: {
					...initial.user.metadata,
					...changes.user.metadata,
				},
			},
		}, );
	}, );

	test( 'updates a deep property with array of keys and partial', () => {
		const changes = {
			email: false,
			frequency: {
				weekly: 30,
			},
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.deepUpdate( ['user', 'profile', 1, 'notifications',], changes, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( {
			...initial,
			user: {
				...initial.user,
				profile: {
					...initial.user.profile,
					1: {
						...initial.user.profile[ 1 ],
						notifications: {
							...initial.user.profile[ 1 ].notifications,
							...changes,
							frequency: {
								...initial.user.profile[ 1 ].notifications.frequency,
								...changes.frequency,
							},
						},
					},
				},
			},
		}, );
	}, );

	test( 'updates a deep property with array of one key and value', () => {
		const changes = ['Tom',];
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.deepUpdate( ['[friends]',], changes, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( {
			...initial,
			'[friends]': changes,
		}, );
	}, );

	test( 'updates a deep property with array of keys and value', () => {
		const changes = false;
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.deepUpdate( ['user', 'profile', 1, 'notifications', 'email',], changes, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( {
			...initial,
			user: {
				...initial.user,
				profile: {
					...initial.user.profile,
					1: {
						...initial.user.profile[ 1 ],
						notifications: {
							...initial.user.profile[ 1 ].notifications,
							email: changes,
						},
					},
				},
			},
		}, );
	}, );

	test( 'updates a deep property with deep string of props and partial', () => {
		const changes = {
			email: false,
			frequency: {
				weekly: 30,
			},
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.deepUpdate( 'user.profile.1.notifications', changes, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( {
			...initial,
			user: {
				...initial.user,
				profile: {
					...initial.user.profile,
					1: {
						...initial.user.profile[ 1 ],
						notifications: {
							...initial.user.profile[ 1 ].notifications,
							...changes,
							frequency: {
								...initial.user.profile[ 1 ].notifications.frequency,
								...changes.frequency,
							},
						},
					},
				},
			},
		}, );
	}, );

	test( 'updates a deep property with string and value', () => {
		const changes = ['Tom',];
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.deepUpdate( '[friends]', changes, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( {
			...initial,
			'[friends]': changes,
		}, );
	}, );

	test( 'updates a deep property with deep string prop and value', () => {
		const changes = false;
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.deepUpdate( 'user.profile.1.notifications.email', changes, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( {
			...initial,
			user: {
				...initial.user,
				profile: {
					...initial.user.profile,
					1: {
						...initial.user.profile[ 1 ],
						notifications: {
							...initial.user.profile[ 1 ].notifications,
							email: changes,
						},
					},
				},
			},
		}, );
	}, );

	test( 'updates a deep property with deep string prop with dot and value', () => {
		const changes = {
			'profile.name': 'Jon',
			'[profile.name]': 'Jon',
			profile: {
				name: 'Jon',
			},
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.deepUpdate( 'user', changes, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( {
			...initial,
			user: {
				...initial.user,
				...changes,
				profile: {
					...initial.user.profile,
					...changes.profile,
				},
			},
		}, );
	}, );

	test( 'updates a deep property with deep string prop with dot and value', () => {
		const changes = 'Jon';
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const res1 = {
			...initial,
			user: {
				...initial.user,
				profile: {
					...initial.user.profile,
					name: changes,
				},
			},
		};

		act( () => {
			result.current[ 1 ].cta.deepUpdate( 'user.profile.name', changes, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( res1, );

		const res2 = {
			...initial,
			user: {
				...initial.user,
				'profile.name': changes,
				profile: {
					...initial.user.profile,
					name: changes,
				},
			},
		};
		act( () => {
			result.current[ 1 ].cta.deepUpdate( 'user.profile\\.name', changes, );
		}, );
		expect( result.current[ 0 ].current, ).toStrictEqual( res2, );

		const res3 = {
			...res2,
			user: {
				...res2.user,
				'[profile.name]': changes,
				profile: {
					...res2.user.profile,
					name: changes,
				},
			},
		};
		act( () => {
			result.current[ 1 ].cta.deepUpdate( 'user.[profile\\.name]', changes, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( res3, );
	}, );

	test( 'updates [friends] value', () => {
		const changes = ['Jon',];
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.deepUpdate( '[friends]', changes, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( {
			...initial,
			'[friends]': changes,
		}, );
	}, );

	test( 'updates key 1 value', () => {
		const changes = {
			greet: 'hello',
		};
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.deepUpdate( 1, changes, );
		}, );

		expect( result.current[ 0 ].current, ).toStrictEqual( {
			...initial,
			1: {
				...initial[ 1 ],
				...changes,
			},
		}, );
	}, );

	test( 'unset nested key', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		act( () => {
			result.current[ 1 ].cta.deepUpdate( 'user.[profile\\.name]', undefined, );
		}, );

		expect( result.current[ 0 ].current, ).toHaveProperty(
			'user.[profile\\.name]',
			undefined,
		);
	}, );

	test( 'toggle nested key', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const emailValue = result.current[ 0 ].current.user.profile[ 1 ].notifications.email;
		act( () => {
			result.current[ 1 ].cta.deepUpdate(
				'user.profile.1.notifications.email',
				( { currentValue, }, ) => !currentValue
				,
			);
		}, );

		expect( result.current[ 0 ].current, ).toHaveProperty( 'user.profile.1.notifications.email', !emailValue, );
	}, );

	test( 'toggle nested array key', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const emailValue = result.current[ 0 ].current.user.profile[ 1 ].notifications.email;
		act( () => {
			result.current[ 1 ].cta.deepUpdate(
				['user', 'profile', 1, 'notifications', 'email',],
				( { currentValue, }, ) => !currentValue
				,
			);
		}, );

		expect( result.current[ 0 ].current, ).toHaveProperty( 'user.profile.1.notifications.email', !emailValue, );
	}, );

	test( 'update nested array value', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		const payload = 'jon@example.com';
		const [contacts0,] = result.current[ 0 ].current.user.profile.contacts;
		act( () => {
			result.current[ 1 ].cta.deepUpdate(
				'user.profile.contacts.0.value',
				() => payload,
			);
		}, );

		expect( result.current[ 0 ].current, ).toHaveProperty( 'user.profile.contacts.0', {
			...contacts0,
			value: payload,
		}, );
	}, );

	test( 'update nested key with callback', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		// eslint-disable-next-line prefer-destructuring -- this is an object with a number key
		const { notifications, } = result.current[ 0 ].current.user.profile[ 1 ];
		act( () => {
			result.current[ 1 ].cta.deepUpdate(
				'user.profile.1.notifications',
				( { currentValue, }, ) => ( {
					email: !currentValue.email,
					push: !currentValue.push,
					frequency: {
						daily: 2,
					},
				} )
				,
			);
		}, );

		expect( result.current[ 0 ].current, ).toHaveProperty( 'user.profile.1.notifications', {
			...notifications,
			email: !notifications.email,
			push: !notifications.push,
			frequency: {
				...notifications.frequency,
				daily: 2,
			},
		}, );
	}, );

	test( 'update nested key with callback', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		let canSet = true;
		act( () => {
			result.current[ 1 ].cta.deepUpdate(
				'user.profile.1.notifications.email',
				( params, ) => {
					try {
					// @ts-expect-error -- part of the test
						params.something = 'something';
					}
					catch {
						canSet = false;
					}
					return false;
				}
				,
			);
		}, );

		expect( canSet, ).toBe( false, );
	}, );

	test( 'update nested key with callback', () => {
		const { result, } = renderHook( () => useCTA( {
			initial,
		}, ), );
		let canSet = true;
		act( () => {
			result.current[ 1 ].cta.deepUpdate(
				['user', 'profile', 1, 'notifications', 'email',],
				( params, ) => {
					try {
						// @ts-expect-error -- part of the test
						params.something = 'something';
					}
					catch {
						canSet = false;
					}
					return false;
				}
				,
			);
		}, );

		expect( canSet, ).toBe( false, );
	}, );
}, );
