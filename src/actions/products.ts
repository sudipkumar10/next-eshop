"use server";

import { Prisma } from "@/generated/prisma/client";
import db from "@/lib/db";

export interface GetProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "price-asc" | "price-desc" | "name-asc";
  isFeatured?: boolean;
}

export async function getProducts(params: GetProductsParams = {}) {
  const {
    page = 1,
    limit = 12,
    search,
    categorySlug,
    minPrice,
    maxPrice,
    sort = "newest",
    isFeatured,
  } = params;

  try {
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (categorySlug) {
      where.category = {
        slug: categorySlug,
      };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (isFeatured !== undefined) {
      where.isFeatured = isFeatured;
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
    if (sort === "price-asc") orderBy = { price: "asc" };
    if (sort === "price-desc") orderBy = { price: "desc" };
    if (sort === "name-asc") orderBy = { name: "asc" };

    const [products, totalCount] = await Promise.all([
      db.product.findMany({
        where,
        include: {
          category: true,
        },
        orderBy,
        skip,
        take: limit,
      }),
      db.product.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      success: true,
      data: products,
      meta: {
        total: totalCount,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error: any) {
    console.error("Failed to fetch products:", error);
    return {
      success: false,
      error: "Failed to fetch products",
      data: [],
      meta: {
        total: 0,
        page: 1,
        limit,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await db.product.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    if (!product) {
      return { success: false, error: "Product not found", data: null };
    }

    return { success: true, data: product };
  } catch (error: any) {
    console.error("Failed to fetch product by slug:", error);
    return {
      success: false,
      error: "Failed to fetch product details",
      data: null,
    };
  }
}
