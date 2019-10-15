## Generating snapshots from markdown examples

This example demonstrates using Sosia to generate snapshots to verify the state of your components, based on markdown examples.

The core idea behind this example is that visual regression tests can be generated from pre-existing markdown examples. It's not uncommon for component documentation to be written in markdown (for example, [gatsby markdown pages](https://www.gatsbyjs.org/docs/adding-markdown-pages/)). By leveraging these same markdown files then generating snapshots from the examples defined in "JSX fenced code blocks", we can get a head-start on our testing.

This provides us out-of-the-box regression test coverage ensuring that a component looks as it should when initially rendered, allowing us to focus our testing efforts on writing tests to demonstrate how a component behaves as it should upon user interaction.

The following presentation discusses the concept demonstrated by this example: [link](https://docs.google.com/presentation/d/1p9mofP6pAUYmMcvbCh22zk6HnDh0yb3fVjKQjQ1WiUQ/present?slide=id.g5f916f50f6_0_26).
