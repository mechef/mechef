# MeChef

## Add new pages

Each page for routing should be put under pages folder as next.js's convention.
Other components can be placed under any folder you want.
```
/pages
  foo.js
```

## Navigate between pages

#### In pages folder
```
/pages
  foo.js
```
#### In your component
```
<Link href="/foo">
  <button>Go to Foo Page</button>
</Link>
```
When you click the link, it will be routed to https://mechef.com/foo

## Navigate with query string

```
<Link href={`/foo?id=1234`}>
  <a>Go to foo page with id 1234</a>
</Link>
```
While clicking the link, it will be routed to https://mechef.com/foo?id=1234.

Then, foo page can utilize query string from props.url.query object as below:

```
<div>
  <h1>Foo</h1>
  <p>{props.url.query.id}</p>
</div>
```
**Note:** If you use high order component, the wrapped component cannot access to props.url.query object.

## Route masking

If you don't want to show query string as part of url, you can use **as** props to specify:

```
<Link as={`/foo/${props.id}`} href={`/foo?id=${props.id}`}>
  <h1>Go to foo page</h1>
  <a>{props.id}</a>
</Link>
```

The url in the address bar would be https://mechef.com/foo/1234 instead of https://mechef.com/foo?id=1234

However, with only specifying **as** props, it only supports client-side rendering.
If you reload the page, server-side can't recognize path /foo/1234.
To make it work on server-side, you have to add custom routing as below:

In server.js
```
server.get('/foo/:id', (req, res) => {
  const actualPage = '/foo'
  const queryParams = { id: req.params.id }
  app.render(req, res, actualPage, queryParams)
})
```

## How to fetch API endpoint

We use [isomorphic-unfetch](https://github.com/developit/unfetch/tree/master/packages/isomorphic-unfetch) to fetch api endpoint no matter it's server-side or client-side rendering

In the Foo page where you want to fetch api endpoint, specify **Foo.getInitialProps** function as below:
```
const Foo = (props) => {
  // Data from api endpoint
  const bar = props.bar;
  return (
    <div>
      ...
    </div>
  );
}

Foo.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://api.mechef.com/bar/${id}`)
  const bar = await res.json()

  return { bar }
}
```
We can use **context** object to get query string from url.
The return value will be passed as props to the Foo Page component.

## We use Styled jsx to style our component (Suggested by next.js)

Example:
```
const Foo = (props) => (
  <div>
    <h1>My Blog</h1>
    <ul>
      ...
    </ul>

    <style jsx>{`
      h1 {
        font-family: "Arial";
      }

      ul {
        padding: 0;
      }

      ...

    `}</style>

  </div>
)
```
#### To be noted

* Don't forget to wrap your css rules inside template string {``}.
* Dynamic variable can be used inside template string.
* CSS rules have no effect on elements inside of a child component.



