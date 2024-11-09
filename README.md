# react-hook-use-cta: useCTA (use Call To Action)

A React hook for managing complex state with custom actions and type safety.

**Features**

* Type-safe state management
* Initial state management
* Built-in state history tracking
  * `initial`: The initial state of the component
  * `previousInitial`: Tracks previous initial state 
  * `current`: The current state of the component
  * `previous`: The state before `current` state changed
  * `changes`: Different between initial and current state
* Default action types
  * update: Update current state
  * replace: Replace entire current state
  * updateInitial: Update initial state
  * replaceInitial: Replace initial state
  * reset: Reset current state to initial state, or replace initial state and current state
* Flexible and customizable actions for state management

# Table of Contents

- [NPM](#npm)
- [Yarn](#yarn)

# NPM

```bash
npm i react-hook-use-cta
```

# Yarn

```bash
yarn add react-hook-use-cta
```

# Basics

[Playground](https://codesandbox.io/p/sandbox/react-hook-use-cta-7jnc32?file=%2Fsrc%2FApp.tsx%3A17%2C34)

<details open>

<summary>Basic example code</summary>

```tsx
import { useEffect, } from 'react';
import { useCTA, } from 'react-hook-use-cta'

function View() {
	const [
		state,
		dispatch,
	] = useCTA({
		initial: {
			search: 'initial',
			isFuzzy: false, 
			count: 0,
		}
	});

	useEffect(
		() => dispatch.cta.update('search', 'update search'),
		[]
	);

	/* Renders `update search` */
	return state.search;
}
```

</details>

# Required Parameter: initial

> [!IMPORTANT]
> 
> A **required** key/value `object` representing the initial object that defines your state structure.
> This serves as the base state and can be reset to later.
> 
> Property values can be anything that [strictDeepEqual](https://github.com/planttheidea/fast-equals/tree/v5.0.1?tab=readme-ov-file#strictdeepequal)
> from [fast-equals](https://github.com/planttheidea/fast-equals/tree/v5.0.1?tab=readme-ov-file#fast-equals) supports.

Typescript:

https://github.com/rafde/react-hook-use-cta/blob/9e9206f1ff06e2de5adcde5d107d9d847e210063/src/types/CTAInitial.ts#L1

# useCTA Returned Value

> [!IMPORTANT]
> 
> useCTA returns a type-safe array with two elements for managing complex state
> operations while maintaining access to state history and change tracking.

## state

> [!IMPORTANT]
> 
> The first value in the returned array. Gives you access to the complete state object containing:
> * `current`: The current state object.
> * `previous`: The previous `current` state object before the last update. Starts of as `null` until `current` state is updated.
> * `changes`: The changes between the `initial` state and the `current` state. 
> Is `null` if the there are no differences between the initial and current state.
> * `initial`: The state it was initiated with. Can be updated to reflect a point of synchronization.
> * `previousInitial`: The previous `initial` state before it was updated. Starts of as `null` until `initial` state is updated.

## dispatch

> [!IMPORTANT]
> 
> The second value in the returned array. Gives you access to the dispatch function 
> which allows you to trigger state changes of `current`, `initial`, `previousInitial`, `previous`, and/or `changes` state through actions.
> 
> Re-render will not occur if the state does not change.
> 
> The following built-in actions are available:

### dispatch.cta.update

> [!IMPORTANT]
> Lets you modify specific properties of your `current` state while preserving other values.

#### Update example

```tsx
/*
initial = {
	search: 'initial',
	isFuzzy: false, 
}

current = {
	search: 'initial',
	isFuzzy: false, 
}

previous = null

previousInitial = null

changes = null
 */

dispatch.cta.update({ 
	search: 'update',
});

// Althernative example for single property update
dispatch.cta.update('search', 'update');
```

<details>

<summary>alternate update example</summary>

```tsx
dispatch({ 
	type: 'update',
	payload: {
		search: 'update',
	},
});
```

</details>

|                 | state                                    | has changed |
|-----------------|------------------------------------------|-------------|
| current         | `{ search: 'update', isFuzzy: false, }`  | true        |
| previous        | `{ search: 'initial', isFuzzy: false, }` | true        |
| initial         | `{ search: 'initial', isFuzzy: false, }` | false       |
| previousInitial | `null`                                   | false       |
| changes         | `{ search: 'update', }`                  | true        |


### dispatch.cta.replace

> [!IMPORTANT]
> 
> Replaces all `current` state property values with new property values.

#### Replace example

```tsx
/*
initial = {
	search: 'initial',
	isFuzzy: false, 
}

current = {
	search: 'current',
	isFuzzy: false, 
}

previous = {
	search: 'initial',
	isFuzzy: false, 
}

previousInitial = null

changes = {
	search: 'current',
}
 */

dispatch.cta.replace({ 
	search: 'replace',
	isFuzzy: true,
});
```

<details>

<summary>Alternate replace example</summary>

```tsx
dispatch({ 
	type:'replace',
	payload: {
		search: 'replace',
		isFuzzy: true,
	},
});
```

</details>

|                 | state                                    | has changed |
|-----------------|------------------------------------------|-------------|
| current         | `{ search: 'replace', isFuzzy: true, }`  | true        | 
| previous        | `{ search: 'current', isFuzzy: false, }` | true        |
| initial         | `{ search: 'initial', isFuzzy: false, }` | false       |
| previousInitial | `null`                                   | false       |
| changes         | `{ search: 'replace', isFuzzy: true, }`  | true        |

---

### dispatch.cta.reset

> [!IMPORTANT]
> 
> Resets the current state back to the initial state or to synchronize the current state and the initial state.

#### Reset current state back to initial state example

```tsx
/*
initial = {
	search: 'initial',
	isFuzzy: false, 
}

current = {
	search: 'current',
	isFuzzy: true, 
}

previous = {
	search: 'previous',
	isFuzzy: false, 
}

previousInitial = null

changes = {
	search: 'current',
	isFuzzy: true, 
}
 */

dispatch.cta.reset();
```

|                 | state                                    | has changed |
|-----------------|------------------------------------------|-------------|
| current         | `{ search: 'initial', isFuzzy: false, }` | true        |
| previous        | `{ search: 'current', isFuzzy: true, }`  | true        |
| initial         | `{ search: 'initial', isFuzzy: false, }` | false       |
| previousInitial | `null`                                   | false       |
| changes         | `null`                                   | true        |

<details>

<summary>Alternate reset current state back to initial state</summary>

```tsx
dispatch({
	type: 'reset',
})
```

</details>

#### Reset initial and current state to some other state example

```tsx
/*
initial = {
	search: 'initial',
	isFuzzy: false, 
}

current = {
	search: 'current',
	isFuzzy: true, 
}

previous = {
	search: 'previous',
	isFuzzy: false, 
}

previousInitial = null

changes = {
	search: 'current',
	isFuzzy: true, 
}
 */

// `current` and `initial` state will be reset to `previous` state
dispatch.cta.reset((state) => state.previous);
```

<details>

<summary>Alternate reset initial and current state to some other state example</summary>

```tsx
dispatch({
	type: 'reset',
	payload: ((state) => state.previous),
})
```

</details>

|                 | state                                     | has changed |
|-----------------|-------------------------------------------|-------------|
| current         | `{ search: 'previous', isFuzzy: false, }` | true        |
| previous        | `{ search: 'current', isFuzzy: true, }`   | true        |
| initial         | `{ search: 'previous', isFuzzy: false, }` | true        |
| previousInitial | `{ search: 'initial', isFuzzy: false, }`  | true        |
| changes         | `null`                                    | true        |


### dispatch.cta.updateInitial

> [!IMPORTANT]
>
> Lets you modify specific properties of your `initial` state while preserving other values.

#### updateInitial state example

```tsx

/*
initial = {
	search: 'initial',
	isFuzzy: false, 
}

current = {
	search: 'initial',
	isFuzzy: false, 
}

previous = null

previousInitial = null

changes = null
 */

dispatch.cta.updateInitial({ 
	search: 'updateInitial',
});
```

<details>

<summary>Alternate updateInitial example</summary>

```tsx
dispatch({
	type: 'updateInitial',
	payload: {
		search: 'updateInitial',
	},
})
```

</details>

|                 | state                                          | has changed |
|-----------------|------------------------------------------------|-------------|
| current         | `{ search: 'initial', isFuzzy: false, }`       | false       |
| previous        | `null`                                         | false       |
| initial         | `{ search: 'updateInitial', isFuzzy: false, }` | true        |
| previousInitial | `{ search: 'initial', isFuzzy: false, }`       | true        |
| changes         | `{ search: 'initial', }`                       | true        |


### dispatch.cta.replaceInitial

> [!IMPORTANT]
> 
> Used to replace all `initial` state property values with new property values.

#### replaceInitial state example

```tsx
/*
initial = {
	search: 'initial',
	isFuzzy: false, 
}

current = {
	search: 'initial',
	isFuzzy: false, 
}

previous = null

previousInitial = null

changes = {
	search: 'current',
	isFuzzy: true, 
}

 */

dispatch.cta.replaceInitial({ 
	search: 'replaceInitial',
	isFuzzy: true,
});
```

<details>

<summary>Replace initial state with a new state</summary>

```tsx
dispatch({
	type: 'replaceInitial',
	payload: {
		search: 'replaceInitial',
		isFuzzy: true,
	},
})
```

</details>

|                 | state                                          | has changed |
|-----------------|------------------------------------------------|-------------|
| current         | `{ search: 'initial', isFuzzy: false, }`       | false       | 
| previous        | `null`                                         | false       |
| initial         | `{ search: 'replaceInitial', isFuzzy: true, }` | true        |
| previousInitial | `{ search: 'initial', isFuzzy: false, }`       | true        |
| changes         | `{ search: 'initial', isFuzzy: false, }`       | true        |


### dispatch.state

> [!IMPORTANT]
> A read-only reference to the [state](#state) object, in case you need to read it from somewhere that doesn't need as a dependency.

# Optional Parameter: onInit

Typescript:

https://github.com/rafde/react-hook-use-cta/blob/c5f2ca0dcf076bd9d98d149689734055a1e11f3f/src/types/UseCTAParameterOnInit.ts#L1

> [!NOTE]
> 
> _Optional_ callback with the following key features:
> * Runs once on component mount
> * Receives the initial state as a parameter
> * Can return a new state object to override initial values
> * Perfect for setting up derived state or initial data from props
> * This makes onInit particularly useful when you need to perform calculations or transformations on your initial state before your component starts using it.

Typescript:

https://github.com/rafde/react-hook-use-cta/blob/73a42138ccd222862b2f7e29b9f369fdb899ad09/src/types/UseCTAParameter.ts#L4

## onInit example code

```tsx
import { useCTA, } from 'react-hook-use-cta'

function View() {
	const [
		state,
	] = useCTA({
		initial: {
			search: '',
		},
		onInit(initial) {
			return {
				...initial,
				search: 'onInit',
			}
		}
	});
	
	// renders `onInit`
	return state.search;
}
```

# Optional Parameter: compare

> [!NOTE]
> 
> _Optional_ callback that allows you to customize how state equality is determined.
> By default, useCTA uses [strictDeepEqual](https://github.com/planttheidea/fast-equals/tree/v5.0.1?tab=readme-ov-file#strictdeepequal)
> from the [fast-equals](https://github.com/planttheidea/fast-equals/tree/v5.0.1?tab=readme-ov-file#fast-equals) library for comparisons.
> The compare function receives two parameters:
> * First parameter: The current value from a property 
> * Second parameter: The next value from a property
> 
> It should return:
> * `true` if the states are considered equal
> * `false` if the states are different
>
> This is particularly useful when:
> * You need custom equality logic 
> * You want to optimize re-renders by comparing only specific properties 
> * Working with complex nested objects that need special comparison handling

Typescript:

https://github.com/rafde/react-hook-use-cta/blob/c5f2ca0dcf076bd9d98d149689734055a1e11f3f/src/types/UseCTAParameterCompare.ts#L3

## Compare example code

```tsx
import { useCTA, } from 'react-hook-use-cta'

class CompareExample {
	value: unknown;
	constructor( value: unknown, ) {
		this.value = value;
	}

	getValue() {
		return this.value;
	}
}

function View() {
	const [
		state,
	] = useCTA({
		initial: {
			search: '',
			example: new CompareExample('initial'),
		},
		compare(prev, next, cmp) {
			let p = prev;
			let n = next;
			if ( p instanceof CompareExample ) {
				p = p.getValue();
			}

			if ( n instanceof CompareExample ) {
				n = n.getValue();
			}

			return cmp( p, n, );
		}
	});

	useEffect(
		() => dispatch.cta.update('example', new CompareExample('example')),
		[]
	);
	
	// renders `example`
	return state.example.getValue();
}
```

# Optional Parameter: actions

> [!NOTE]
> 
> _Optional_ key/value `object` with the following capabilities:
> * Gives you a clean, type-safe way to encapsulate your state logic while keeping your component code focused on presentation.
> * Defines reusable state operations
> * Maintains full TypeScript type safety
> * Can be called via dispatch.cta or dispatch
> * Can augment the built-in actions
> * Receives state object as first parameter
> * Can accept multiple parameters
> * Has access all built-in actions like:
> 	* updateAction
> 	* replaceAction
> 	* resetAction 
> 	* updateInitialAction
> 	* replaceInitialAction

## Augmenting actions

> [!NOTE]
> 
> An augmented action is a way to extend or modify the behavior of built-in call-to-action (CTA).
> All built-in actions can be augmented.
> 
> When augmenting an existing CTA, you receive a read-only CTAState as the first parameter containing:
> * current: The current state
> * previous: The previous state, or `null` if `current` has not been changed
> * initial: The initial state
> * previousInitial: The previous `initial` state, or `null` if `initial` has not changed.
> * changes: The difference between the `current` and `initial` state, or `null` if there are no changes
> 
> The second parameter is the expected signature of the augmented action (please refer to DefaultActionsRecord type below).
> 
> This pattern enables:
> * Adding custom validation
> * Transforming data
> * Adding side effects
> * Adding logging
> 
> Returning `undefined` will prevent the action from triggering.

Typescript:

https://github.com/rafde/react-hook-use-cta/blob/c5f2ca0dcf076bd9d98d149689734055a1e11f3f/src/types/CTAState.ts#L3-L9

https://github.com/rafde/react-hook-use-cta/blob/c5f2ca0dcf076bd9d98d149689734055a1e11f3f/src/types/DefaultActionsRecord.ts#L7-L11

### Augmenting update action example code

```tsx
import {useCTA,} from 'react-hook-use-cta'

function View() {
	const [
		state,
		dispatch,
	] = useCTA({
		initial: {
			count: 0,
		},
		actions: {
			update(ctaState, payload) {
				let {
					count,
				} = payload;
				
				if (typeof count === "number" && count > 10) {
					return {
						count: ctaState.current.count
					}
				}
				
				return payload
			}
		}
	});

	return <button onClick={() => {dispatch.cta.update((ctaState) => ({count: ctaState.current.count + 1}))}}>
		Increase Count: {state.current.count}
	</button>;
}
```

## Custom actions

> [!NOTE]
> Custom actions are a powerful way to extend the functionality of your state management system. 
> By default, they behave as an [update](#dispatchctaupdate) action, but you can customize them to behave like any other built-in action.
> 
> The first parameter is optional. It's an extended CTAState with the following properties:
> * updateAction
> * replaceAction
> * resetAction
> * updateInitialAction
> * replaceInitialAction
> 
> If a built-in action is augmented, it will behave as the augmented action, but you can still call the original action by using the `useDefault` option.
> 
> This gives you the flexibility to:
> * Create domain-specific actions
> * Encapsulate complex state updates
> * Build reusable action patterns
> * Handle specialized business logic

### Custom action example code

```tsx
import {useCTA,} from 'react-hook-use-cta'

function View() {
	const [
		state,
		dispatch,
	] = useCTA({
		initial: {
			result: 0,
		},
		actions: {
			add(ctaParam, value: number) {
				return {
					result: ctaParam.current.result + value
				}
			},
			subtract(ctaParam, value: number) {
				return {
					result: ctaParam.current.result - value
				}
			},
			multiply(ctaParam, value: number) {
				return {
					result: ctaParam.current.result * value
				}
			},
			divide(ctaParam, value: number) {
				return {
					result: ctaParam.current.result / value
				}
			},
		}
	});

	return <section>
		<h2>Result: {state.result}</h2>
		<button onClick={() => dispatch.cta.add(5)}>Add 5</button>
		<button onClick={() => dispatch.cta.subtract(3)}>Subtract 3</button>
		<button onClick={() => dispatch.cta.multiply(2)}>Multiply by 2</button>
		<button onClick={() => dispatch.cta.divide(4)}>Divide by 4</button>
		<button onClick={() => dispatch.cta.reset()}>Clear</button>
	</section>;
}
```
