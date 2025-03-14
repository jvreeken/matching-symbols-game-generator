import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';

const HeaderComponent = () => (
  <Segment inverted textAlign="center" vertical className="header">
    <Container text>
      <Header
        as="h1"
        content="Matching Symbols Game Generator"
        inverted
        className="title"
      />
      <Header
        as="h2"
        content="Prepare and print cards with your own images"
        inverted
        className="subtitle"
      />
    </Container>
  </Segment>
);

export default HeaderComponent;
