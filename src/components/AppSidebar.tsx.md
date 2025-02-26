# AppSidebar Component Documentation

## Table of Contents

* [1. Overview](#1-overview)
* [2. Props](#2-props)
* [3. State](#3-state)
* [4. Functions](#4-functions)
    * [4.1 `handleMainButtonClick`](#41-handlemainbuttonclick)
* [5. Component Structure](#5-component-structure)


## 1. Overview

The `AppSidebar` component renders a sidebar navigation for a cryptography application. It provides sections for encryption and decryption, each with a set of sub-options.  The sidebar uses Lucide React icons for visual representation.  Currently, an Analysis section is commented out but the structure is in place for future implementation.


## 2. Props

| Prop Name          | Type                               | Description                                                                 |
|----------------------|------------------------------------|-----------------------------------------------------------------------------|
| `activeSection`     | `string`                           | The currently active section in the application. Used to highlight the selected item. |
| `onSectionChange`   | `(section: string) => void`       | Callback function to change the active section in the parent component.     |


## 3. State

| State Variable       | Type                                     | Description                                                                         |
|-----------------------|-----------------------------------------|-------------------------------------------------------------------------------------|
| `expandedSection`    | `"encrypt" \| "decrypt" \| null`         | Tracks which main section (Encrypt or Decrypt) is currently expanded. `null` indicates neither is expanded. |


## 4. Functions

### 4.1 `handleMainButtonClick`

This function controls the expansion and collapse of the "Encrypt" and "Decrypt" sections.

```javascript
const handleMainButtonClick = (section: "encrypt" | "decrypt") => {
    setExpandedSection(expandedSection === section ? null : section);
};
```

**Algorithm:**  The function uses a ternary operator to toggle the `expandedSection` state. If the clicked section (`section`) is already expanded (`expandedSection === section`), it sets `expandedSection` to `null`, collapsing the section. Otherwise, it sets `expandedSection` to the clicked section, expanding it.  This provides a simple and efficient way to manage the expansion state of the sidebar sections.


## 5. Component Structure

The `AppSidebar` component renders a navigation bar with two main sections: "Encrypt" and "Decrypt". Each main section can be expanded to reveal a list of sub-sections.

* **Main Section Buttons:** Each main section ("Encrypt" and "Decrypt") has a button to toggle its expansion state. The button's appearance changes based on its expanded state (using CSS classes).  The buttons use Lucide React icons (`Lock` for Encrypt and `Unlock` for Decrypt).

* **Sub-Section Buttons:** When a main section is expanded, a list of sub-sections appears. Each sub-section is a button that, when clicked, calls the `onSectionChange` prop, updating the active section in the parent component.  The appearance of the sub-section buttons indicates whether they are currently active.

* **Commented-Out Analysis Section:**  The code includes a commented-out section for "Analysis," which is structurally similar to the "Encrypt" and "Decrypt" sections, suggesting future expansion of the application's functionality.  This section would use a `Search` icon.

The component uses functional components and state management with `useState` from React.  Conditional rendering (`{expandedSection === "encrypt" && ...}`) is used to display the sub-sections only when the corresponding main section is expanded.  The styling is handled through CSS classes applied conditionally based on the component's state and props.
