import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";
import { Heading, List, ListItem, Box } from "@chakra-ui/core";

export default function Index() {
  const { site } = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  const { data, loading, error } = useQuery(gql`
    query {
      country(code: "CA") {
        name
        emoji
        capital
        languages {
          code
          name
          rtl
        }
      }
    }
  `);

  if (loading) return <div>Is Loading...</div>;

  if (error) {
    // console.log(error);
    return (
      <>
        <div>error happens</div>
        <p>{JSON.stringify(error)}</p>
        <div>
          <p>{error.message}</p>
        </div>
      </>
    );
  }

  const { title } = site.siteMetadata;
  const { emoji, name, languages } = data.country;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My {title}</title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <Box as="header" px="3" py="4" bg="grey.100%">
        {title}
      </Box>
      <Box p="4">
        <Heading mb="2">
          {emoji} {name}
        </Heading>
        <List styleType="disc">
          {languages.map((lan) => (
            <ListItem key={lan.code}>{lan.name}</ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}
