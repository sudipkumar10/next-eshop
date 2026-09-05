import { OrderStatus, PaymentStatus } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { faker } from "@faker-js/faker";

// Curated high-quality Unsplash image URLs for a professional e-commerce UI look
const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&auto=format&fit=crop&q=80",
];

async function main() {
  console.log("🧹 Cleaning up existing database records...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Fetch registered user for mapping relations
  const existingUser = await prisma.user.findFirst();

  if (!existingUser) {
    console.error(
      "❌ Error: No user found in the database. Please sign up in your app first, then run seed!",
    );
    process.exit(1);
  }

  const userId = existingUser.id;
  console.log(`👤 Seeding data for user: ${userId} (${existingUser.email})`);

  // 1. Create exactly 5 Categories
  console.log("📂 Creating 5 categories...");
  const categoryData = [
    {
      name: "Electronics",
      slug: "electronics",
      description: "Cutting-edge gadgets and digital devices",
    },
    {
      name: "Apparel",
      slug: "apparel",
      description: "Modern clothing and fashion wear",
    },
    {
      name: "Home & Kitchen",
      slug: "home-and-kitchen",
      description: "Essentials for a modern lifestyle and living",
    },
    {
      name: "Fitness",
      slug: "fitness",
      description: "Gear and equipment to keep you healthy and active",
    },
    {
      name: "Books & Stationery",
      slug: "books-and-stationery",
      description: "Knowledge, notebooks, and creative tools",
    },
  ];

  const categories = [];
  for (const cat of categoryData) {
    const createdCat = await prisma.category.create({ data: cat });
    categories.push(createdCat);
  }

  // 2. Create exactly 20 Products with proper image URLs
  console.log("📦 Generating 20 products with proper URLs...");
  const products = [];
  for (let i = 1; i <= 20; i++) {
    const randomCategory = faker.helpers.arrayElement(categories);
    const productName = `${faker.commerce.productName()} ${i}`;
    const price = parseFloat(
      faker.commerce.price({ min: 15, max: 600, dec: 2 }),
    );
    const compareAtPrice = faker.datatype.boolean()
      ? price + parseFloat(faker.commerce.price({ min: 10, max: 120, dec: 2 }))
      : null;
    const selectedImage = faker.helpers.arrayElement(PRODUCT_IMAGES);

    const product = await prisma.product.create({
      data: {
        name: productName,
        slug: `${faker.helpers.slugify(productName).toLowerCase()}-${faker.string.alphanumeric(4)}`,
        description: faker.commerce.productDescription(),
        price,
        compareAtPrice,
        images: [selectedImage],
        stock: faker.number.int({ min: 5, max: 100 }),
        isFeatured: i <= 4, // Make first 4 products featured for UI banners
        categoryId: randomCategory.id,
      },
    });
    products.push(product);
  }

  // 3. Create exactly 2 User Addresses
  console.log("📍 Creating 2 user addresses...");
  const address1 = await prisma.address.create({
    data: {
      userId: userId,
      fullName: existingUser.name || "John Doe",
      phone: "+91 9876543210",
      street: "123 Tech Park, Sector 62",
      city: "Noida",
      state: "Uttar Pradesh",
      postalCode: "201301",
      country: "India",
      isDefault: true,
    },
  });

  const address2 = await prisma.address.create({
    data: {
      userId: userId,
      fullName: existingUser.name || "John Doe",
      phone: "+91 9123456789",
      street: "456 Corporate Boulevard, Cyber City",
      city: "Gurugram",
      state: "Haryana",
      postalCode: "122002",
      country: "India",
      isDefault: false,
    },
  });

  const addresses = [address1, address2];

  // 4. Create 5 Sample Orders with Order Items
  console.log("🛒 Generating 5 sample orders...");
  for (let i = 0; i < 5; i++) {
    const randomAddress = faker.helpers.arrayElement(addresses);
    const selectedProducts = faker.helpers.arrayElements(
      products,
      faker.number.int({ min: 1, max: 4 }),
    );

    let totalAmount = 0;
    const orderItemsData = selectedProducts.map((prod) => {
      const quantity = faker.number.int({ min: 1, max: 3 });
      totalAmount += prod.price * quantity;
      return {
        productId: prod.id,
        quantity,
        price: prod.price,
      };
    });

    const shippingFee = totalAmount > 300 ? 0 : 20.0;

    await prisma.order.create({
      data: {
        userId: userId,
        status: faker.helpers.arrayElement(Object.values(OrderStatus)),
        paymentStatus: faker.helpers.arrayElement(Object.values(PaymentStatus)),
        totalAmount: parseFloat((totalAmount + shippingFee).toFixed(2)),
        shippingFee,
        addressId: randomAddress.id,
        stripeSessionId: `cs_test_${faker.string.alphanumeric(20)}`,
        orderItems: {
          create: orderItemsData,
        },
      },
    });
  }

  console.log(
    "✨ Database seeded successfully with 5 categories, 20 products, 2 addresses, and orders!",
  );
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
