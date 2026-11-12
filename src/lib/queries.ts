import { queryOptions } from "@tanstack/react-query";
import {
  getAboutContent,
  getArticle,
  getContact,
  getHomeData,
  listArticles,
  listThoughts,
} from "./public.functions";

export const homeQuery = () =>
  queryOptions({ queryKey: ["public", "home"], queryFn: () => getHomeData(), staleTime: 60_000 });

export type ArticleFilters = { q?: string; category?: string; author?: string; page?: number };

export const articlesQuery = (filters: ArticleFilters) =>
  queryOptions({
    queryKey: ["public", "articles", filters],
    queryFn: () => listArticles({ data: filters }),
    staleTime: 30_000,
  });

export const articleQuery = (slug: string) =>
  queryOptions({
    queryKey: ["public", "article", slug],
    queryFn: () => getArticle({ data: { slug } }),
    staleTime: 60_000,
  });

export const thoughtsQuery = (filters: { category?: string; page?: number }) =>
  queryOptions({
    queryKey: ["public", "thoughts", filters],
    queryFn: () => listThoughts({ data: filters }),
    staleTime: 30_000,
  });

export const aboutQuery = () =>
  queryOptions({ queryKey: ["public", "about"], queryFn: () => getAboutContent(), staleTime: 60_000 });

export const contactQuery = () =>
  queryOptions({ queryKey: ["public", "contact"], queryFn: () => getContact(), staleTime: 300_000 });
