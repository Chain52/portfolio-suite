import React from 'react';

import { Flex, ButtonLink } from '../element';
import { InlineWidget, useCalendlyEventListener } from 'react-calendly';

export default function Contact() {
  const [widgetHeight, setWidgetHeight] = React.useState('auto');

  useCalendlyEventListener({
    onPageHeightResize(e) {
      setWidgetHeight(e.data.payload.height);
    }
  });

  return (
    <Flex as="section" id="contact" direction="col" className="scroll-mt-24">
      <h2 className="mb-4 text-3xl font-bold">Contact</h2>
      <Flex direction={{ base: 'col' }} className="gap-4">
        <Flex
          direction="col"
          justify="center"
          grow
          className="max-w-prose gap-4"
        >
          <h3 className="mb-3 text-2xl font-semibold">Let's Talk</h3>
          <p>
            Use the scheduler below to book a call, or reach out directly via
            email or LinkedIn!
          </p>
          <Flex className="mt-4 gap-4">
            <ButtonLink
              href="mailto:colinphain@gamil.com"
              text="Email Me"
              icon="mdi:email-outline"
            />
            <ButtonLink
              href="https://www.linkedin.com/in/colin-hain"
              target="blank"
              text="Connect on LinkedIn"
              icon="mdi:linkedin"
            />
          </Flex>
        </Flex>
        <Flex grow className="-mb-8">
          <InlineWidget
            url="https://calendly.com/colinphain"
            styles={{ width: '100%', height: widgetHeight }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
