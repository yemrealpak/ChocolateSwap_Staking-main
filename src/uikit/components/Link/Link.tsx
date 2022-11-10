import React from "react";
import styled from "styled-components";
import getExternalLinkProps from "../../util/getExternalLinkProps";
import Text from "../Text/Text";
import { LinkProps } from "./types";

const StyledLink = styled(Text)<LinkProps>`
  display: flex;
  align-items: center;
  width: fit-content;
  &:hover {
    text-decoration: underline;
  }
`;

const Link: React.FC<LinkProps> = ({ external,href, ...props }) => {
  const internalProps = external ? getExternalLinkProps() : {};
  return <a href={href} style={{color:'white'}}>{props.children}</a>;
};

Link.defaultProps = {
  color: "primary",
};

export default Link;
