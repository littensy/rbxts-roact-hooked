# Latest

# v1.1.1

## Development

❌ Remove `useLayoutEffect` in favor of synchronous `useEffect` 
 - Remove `useLayoutEffect` 5569930f9de3d81188821732cf60c2ab67cae511 @littensy

## Bug Fixes

 - Initialize `self` instead of `componentClass` 3fa442c3df73c2d542e938709c69982cd7059d01 @littensy
 
# v1.1.0

## New Features

🌟 Add `useRef` Hook to memoize `createRef`
 - Add `useRef` 75054f6b23f4e9a67c8b94f3c194e6d4763fcd38 @littensy

🌟 `useState`, `useContext`, & `useReducer` bail out of a rerender if the new state is the same value as the current state
 - More specific Hook documentation c164c8f94f8c863fb86a336bd1ab2670f3a3d510 @littensy

## Bug Fixes

🐞 Fix all props in elements being optional
 - Make `defaultProps` optional 50074de6316f347ce97e06cd92b5d61d0476595c @littensy
 - Update README to avoid `defaultProps` 6a2bc9055a57df7e6b56091efc029a3cd0b2efe8 @littensy

## Development

🌟 Defer `useEffect` & run `useLayoutEffect` synchronously
 - Adjust `useEffect` & `useLayoutEffect` timing 9a46d57b8874a94adf0e619a1b6b32eb4ed2f666 @littensy

📚 Improve documentation for Hooks
 - More specific Hook documentation c164c8f94f8c863fb86a336bd1ab2670f3a3d510 @littensy
 - Remove mention of lifecycle phase c04c65da6ef9f30c5d4177900da5f5c57ea3624e @littensy

# v1.0.5

## Bug Fixes

🌟 Default to `Context.defaultValue` when there is no Provider

# v1.0.4

## Development

🌟 Memoize `contextEntry` in `useContext` as a possible optimization

# v1.0.3

## Bug Fixes

 - Fix nonexistent function calls
 - Fix effects being shared across vcomponents
