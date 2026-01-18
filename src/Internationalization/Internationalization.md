# Internationalization (i18n) & Intl API

## What is Internationalization (i18n)

* Preparing an app to support **multiple languages & regions**
* Done **during development**
* No hardcoded text
* Locale-aware formatting (date, number, currency)

> Goal: *Make the app ready for the world*

---

## 2. What is Localization (l10n)

* Adapting the app for a **specific language/region**
* Translation + regional rules
* Done **after i18n**

---

## 3. Golden Rules of i18n

* ❌ No hardcoded strings
* ✅ Use translation keys
* ✅ Use locale-aware formatting
* ✅ Support RTL if needed

---

## 4. Translation Keys Example

```js
// ❌ Wrong
<button>Login</button>

// ✅ Correct
<button>{t('login')}</button>
```

```json
// en-IN.json
{
  "login": "Login"
}

// hi-IN.json
{
  "login": "लॉगिन"
}
```

---

## 5. What is `Intl`?

* `Intl` is **JavaScript built-in Internationalization API**
* No library installation needed
* Used for:

  * Numbers
  * Dates
  * Time
  * Currency

> Text → i18n library
> Date/Number/Currency → Intl

---

## 6. Number Formatting

```js
new Intl.NumberFormat('en-IN').format(1000000)
// 10,00,000

new Intl.NumberFormat('en-US').format(1000000)
// 1,000,000
```

---

## 7. Currency Formatting

```js
new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR'
}).format(5000)
// ₹5,000.00
```

```js
new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(5000)
// $5,000.00
```

---

## 8. Date Formatting

```js
new Intl.DateTimeFormat('en-IN').format(new Date())
// 18/01/2026

new Intl.DateTimeFormat('en-US').format(new Date())
// 1/18/2026
```

---

## 9. Time Formatting

```js
new Intl.DateTimeFormat('en-IN', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
}).format(new Date())
```

---

## 10. RTL (Right-to-Left) Support

```js
const isRTL = ['ar', 'he'].includes(lang)
document.dir = isRTL ? 'rtl' : 'ltr'
```

---

## 11. Backend + Frontend i18n Flow

* Frontend sends language

```http
Accept-Language: hi-IN
```

* Backend sends keys

```json
{ "message": "INVALID_OTP" }
```

* Frontend translates

```js
t('INVALID_OTP')
```

---

## 12. One-Liners

* i18n prepares the app for multiple languages
* l10n customizes the app for a specific region
* `Intl` handles locale-based formatting in JavaScript

---

## 13. Easy Memory Trick

**Text + Date + Currency + Layout = i18n**