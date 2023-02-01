import Head from 'next/head'
import { Inter } from '@next/font/google'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import client from '../contentful/index'
import { IArticale, IArticaleFields, IHome, IHomeFields } from '../contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Container, Card, Row, Grid, Button, Text, Image } from '@nextui-org/react';


const inter = Inter({ subsets: ['latin'] })

export default function Home({home, articles}: { home: IHome, articles: IArticale[]}) {

  const bannerHeight = 300;
  return (
    <>
      <Head>
        <title>{home.fields.title}</title>
      </Head>
      <main>
          <div style={{position: 'relative', height: bannerHeight }}>
            <Image
              src={`http:${home.fields.background?.fields.file.url}`}
              objectFit="cover"
              alt="Default Image"
              height={bannerHeight}
              autoResize={true}
              containerCss={{
                position: 'absolute', inset: 0, background: '$gradient'
              }}
              css={{opacity: 0.7}}
            />
            <Container css={{position: 'relative', textAlign: 'center', height: '100%', display: 'grid', alignItems: 'center'}}>
              <Text h1 color="$white" css={{ m: 0 }}>{home.fields.title}</Text>
              <Text h6 size={15} color="$white" css={{ m: 0 }}>{documentToReactComponents(home.fields.description)}</Text>
            </Container>
          </div>
      </main>

      <Container>

        <Grid.Container gap={2}>
          {
            articles?.map(article => {
              return (
                <Grid sm={12} md={5} key={article.fields.slug}>
                  <Card>
                    <Card.Header>
                      <Text b>{article.fields.title}</Text>
                    </Card.Header>
                    <Card.Divider />
                    <Card.Body css={{ py: "$10" }}>
                      <Text>
                        {article.fields.description}
                      </Text>
                    </Card.Body>
                    <Card.Divider />
                    <Card.Footer>
                      <Row justify="flex-end">
                          <Button as={Link} href={`/article/${article.fields.slug}`} size="sm">{article.fields.btnText}</Button>
                      </Row>
                    </Card.Footer>
                  </Card>
                </Grid>
              )
            })
          }
        </Grid.Container>

      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const home = await client.getEntries<IHomeFields>({
    content_type: 'home',
    limit: 1
  });

  const articleEntries = await client.getEntries<IArticaleFields>({
    content_type: 'articale',
    select: 'fields.title,fields.slug,fields.description,fields.btnText'
  });

  const [homePage] = home.items;

  return {
    props: {
      title: 'My Blog',
      home: homePage,
      articles: articleEntries.items,
    },
    revalidate: 3600,
  }
}
