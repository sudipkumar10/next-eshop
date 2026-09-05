"use server";

import db from "@/lib/db";

export async function getCategories() {
  try {
    const categories = await db.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: "asc" },
    });
    return { success: true, data: categories };
  } catch (error: any) {
    console.error("Failed to fetch categories:", error);
    return { success: false, error: "Failed to fetch categories", data: [] };
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    const category = await db.category.findUnique({
      where: { slug },
      include: {
        products: true,
      },
    });

    if (!category) {
      return { success: false, error: "Category not found", data: null };
    }

    return { success: true, data: category };
  } catch (error: any) {
    console.error("Failed to fetch category by slug:", error);
    return {
      success: false,
      error: "Failed to fetch category details",
      data: null,
    };
  }
}
