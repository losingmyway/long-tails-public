import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import _ from 'lodash';
import { JsonItem } from '../types/jsonDataTypes';
interface ResLongTail {
  id?: number,
  json_id?: number,
  tail?: string,
  post?: JsonItem,
}

const LongTail = () => {
  const router = useRouter()
  const { slug } = router.query
  const defaultValue = {
    id: 0,
    tail: ''
  };
  const [longTails, setLongTails] = useState<ResLongTail>(defaultValue);
  const [errors, setErrors] = useState<string[]>([]);
  const dataNotFoundMessage = 'Data not found';
  useEffect(() => {
    if (slug !== undefined) {
      fetch(`${process.env.NEXT_PUBLIC_HASUARA_GRAPHQL_URL}`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "x-hasura-admin-secret": `${process.env.NEXT_PUBLIC_HASUARA_ADMIN_SECRET}`,
        } as HeadersInit,
        body: JSON.stringify({
          query: `query GetLongTailByTail($slug: String!) {
              json_data {
                description
                id
                title
              }
              long_tails(limit: 1, where: {tail: {_eq: $slug}, _and: {json_id: {_is_null: false}}}) {
                id
                json_id
                tail
              }
            }
          `,
          variables: { slug },
        }),
      }).then(async (r) => {
        if (r.status !== 200) {
          if (r.status === 400) {
            const data = await r.json()
            throw data.message
          }
          throw r.statusText
        }
        return r.json()
      }).then((data) => {
        if ('errors' in data) {
          throw 'Got error when get data from api';
        }
        let longTailDetail: ResLongTail;
        if (!data?.data?.long_tails || data.data.long_tails.length === 0) {
          throw dataNotFoundMessage;
        }
        longTailDetail = data.data.long_tails[0];
        
        let jsonItems: JsonItem[] = [];
        if (!data?.data?.json_data) {
          throw dataNotFoundMessage;
        }
        jsonItems = data?.data?.json_data;
        longTailDetail.post = jsonItems.find((jsonItem: JsonItem) => 
          +jsonItem.id === +(longTailDetail?.json_id || 0)
        );
        setLongTails(longTailDetail);
      }).catch((err) => {
        setErrors([...errors, err])
      });
    }
    
  }, [slug])
  const details: ResLongTail = longTails;
  if (errors.length) {
    return <p>Error: {errors.join(',')}</p>
  }
  const subCheck = _.has(details, 'post.id') && _.isObject(details?.post);
  const hasData = details && subCheck ? (details?.post?.id || 0) : false;
  if (!hasData) {
    return <p>LongTail Slug: {slug} not existed description</p>
  }
  const title = details?.post?.title || '';
  const description =details?.post?.description || '';
  return <div>
    <p>LongTail Slug: {slug}</p>
    <p>Title: {title}</p>
    <p>Description: {description}</p>
  </div>
}

export default LongTail