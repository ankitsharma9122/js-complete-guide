
## Provider Design Patten

The Provider Pattern is a design pattern in React that involves using a context provider to supply data or functions to child components in a tree of React components. This pattern allows you to share values, states, or behavior across components without needing to pass props through many levels.

Code : [Provider Design Patten](https://codesandbox.io/p/github/ankitsharma9122/context-api-ankit/main?workspaceId=ws_NKRn59Un4iMqzHCn59X444&import=true)

overusing the Provider pattern can result in performance issues. All components that consume the context re-render on each state change.