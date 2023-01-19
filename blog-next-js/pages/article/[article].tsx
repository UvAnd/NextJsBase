import Head from 'next/head'
import { Inter } from '@next/font/google'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import client from '../../contentful/index'
import { IArticale, IArticaleFields, IHome, IHomeFields } from '../../contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Container, Card, Row, Grid, Button, Text, Image } from '@nextui-org/react';


export default function Home({article}: { article: IArticale}) {

  return (
    <>
      <Head>
        <title>{article.fields.title}</title>
      </Head>

      <Container>

        <Card css={{ my: '$11' }}>
          <Card.Header>
            <Text b>{article.fields.title}</Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body css={{ py: "$10" }}>
              {documentToReactComponents(article.fields.content)}
          </Card.Body>
        </Card>

      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articleEntries = await client.getEntries<IArticaleFields>({
    content_type: 'articale',
    select: 'fields.slug'
  });

  return {
    paths: articleEntries.items.map(item => {
      return {
        params: {
          article: item.fields.slug
        }
      }
    }),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const slug = params?.article;

  const articleEntries = await client.getEntries<IArticaleFields>({
    content_type: 'articale',
    limit: 1,
    'fields.slug': slug
  });

  const [article] = articleEntries.items;

  return {
    props: {
      article: article,
    },
  }
}
