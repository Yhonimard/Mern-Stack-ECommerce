import { memo } from "react";
import Link from "next/link";

import { Copyright, Footer, Title, Wrapper } from "./styled";

const FooterComponent = () => {
  return (
    <Footer>
      <Wrapper>
        <div>
          <Link href="/" passHref>
            <Title>YHONISHOP</Title>
          </Link>
          <Copyright>Copyright &copy; {new Date().getFullYear()}.</Copyright>
        </div>
      </Wrapper>
    </Footer>
  );
};

export default memo(FooterComponent);
