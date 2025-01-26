## 1. Container/presentational pattern in React

1. Container Components: Focus on managing state, fetching data, and handling business logic.
2. Presentational Components: Focus solely on rendering UI based on the props they receive, making them reusable and stateless.

Basic component which we make without any custom hook and HOC or any further engineering on it.

## 2. HOC pattern in React
It is a function that takes a component as an argument and returns a new component with enhanced functionality or additional behavior.

![![HOC COMPONENT](<Screenshot 2025-01-26 at 9.32.42 AM.png>)](../../Public/HOC1.png)

Uses withFetchData and withstyle as another nested HOC. 

![!\[HOC2 \](<Screenshot 2025-01-26 at 9.32.06 AM.png>)](../../Public/HOC2.png)

**Pros :**
1. Same Logic can be re-used
2.  keep the logic separate from the UI.

**Cons :**
1. Multiple layer of nesting causes unwanted re-rending.
2. The component hierarchy becomes less clear when HOCs are overused.