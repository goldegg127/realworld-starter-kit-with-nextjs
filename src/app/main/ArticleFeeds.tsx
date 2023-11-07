"use client";

import { Articles } from "@/app/type/index";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';

import ArticleItem from './ArticleItem';
import Pagination from './Pagination';

export default function ArticleFeeds({ articles, articlesCount }: {
  articles: Articles;
  articlesCount: number;
}) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") ?? "1");

  async function fetchPageArticle() {
    const res = await fetch(`https://api.realworld.io/api/articles?offset=${currentPage * 10}&limit=10`);
    
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }

  useEffect(() => {
    // 
  }, []);

  return (
    <>
        <ArticleItem articles={articles} />
        <Pagination articles={articles} currentPage={currentPage} articlesCount={articlesCount} />
    </>
  );
}
