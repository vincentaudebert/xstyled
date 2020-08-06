import React from 'react'
import { Link } from 'gatsby'
import styled, { Box, ThemeProvider, css } from '@xstyled/styled-components'
import { usePrismTheme } from 'smooth-doc/components'
import { variant, th } from '@xstyled/system'
import {
  LiveProvider,
  LiveEditor as BaseLiveEditor,
  LiveError,
  LivePreview,
} from 'react-live'

const Editor = styled.div`
  background-color: secondary-bg;
  font-size: 14;
  height: 300px;
  overflow-y: scroll;
  border-radius: 5;
  caret-color: ${th.color('text')};
  text-align: left;
  padding: 10px;

  textarea {
    margin: 0;
  }

  textarea:focus {
    outline: none;
  }
`

const Preview = styled.div`
  background-color: secondary-bg;
  font-weight: 300;
  overflow-y: scroll;
  border-radius: 5;
  caret-color: ${th.color('text')};
  text-align: left;
  padding: 10px;
`

const code = `
const Button = styled.a\`
  display: inline-block;
  color: white;
  border-radius: medium;
  background-color: primary;
  transition: default;
  padding: 2 3;
  margin: 4;
  font-weight: bold;

  &:hover {
    color: white;
    background-color: primary-light;
  }
\`

const theme = {
  space: [0, 4, 8, 16, 24, 48, 96, 144, 192, 240],
  colors: {
    primary: '#DB3080',
    'primary-light': 'palevioletred',
    secondary: 'gray'
  },
  radii: {
    medium: 3,
  },
  transitions: {
    default: 'all 300ms'
  }
}

render(
  <ThemeProvider theme={theme}>
    <Button
      as={Link}
      variant="secondary"
      to="/docs/getting-started/"
      secondary
    >
      Getting Started
    </Button>
  </ThemeProvider>
)
`.trim()

const scope = { React, ThemeProvider, styled, css, variant, Link }

export function LiveEditor() {
  const theme = usePrismTheme()
  return (
    <Box row mx={-10}>
      <LiveProvider
        theme={theme}
        mountStylesheet={false}
        code={code}
        scope={scope}
        noInline
      >
        <Box col px={10}>
          <Editor>
            <BaseLiveEditor language="jsx" />
          </Editor>
        </Box>
        <Box col px={10}>
          <Preview>
            <LiveError />
            <LivePreview />
          </Preview>
        </Box>
      </LiveProvider>
    </Box>
  )
}
