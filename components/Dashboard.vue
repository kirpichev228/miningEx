<template>
  <div class="dashboard px-3">
    <div class="dashboard__info dashboard-info">
      <div class="dashboard-info__item info-item">
        <div>
          <h3 class="info-item__title">Customers</h3>
          <h4 class="text-2xl font-semibold">{{ props.totalUsers }}</h4>
        </div>
        <div class="info-item__picture">
          <Icon name="heroicons:users" class="info-item__image" size="24px" />
        </div>
      </div>
      <div class="dashboard-info__item info-item">
        <div class="">
          <h3 class="info-item__title">Total Orders</h3>
          <h4 class="text-2xl font-semibold">{{ props.totalOrders }}</h4>
        </div>
        <div class="info-item__picture">
          <Icon
            name="heroicons:shopping-cart"
            color="#444444"
            class="info-item__image"
          />
        </div>
      </div>
      <div class="dashboard-info__item info-item">
        <div class="">
          <h3 class="info-item__title">Total Products</h3>
          <h4 class="text-2xl font-semibold">{{ props.totalItems }}</h4>
        </div>
        <div class="info-item__picture">
          <Icon
            name="heroicons:shopping-bag"
            color="#444444"
            class="info-item__image"
          />
        </div>
      </div>
      <div class="dashboard-info__item info-item">
        <div class="">
          <h3 class="info-item__title">Total Revenue</h3>
          <h4 class="text-2xl font-semibold">${{ props.totalRevenue }}</h4>
        </div>
        <div class="info-item__picture">
          <Icon
            name="heroicons:currency-dollar"
            class="info-item__image"
            size="24px"
          />
        </div>
      </div>
    </div>
    <div class="dashboard__statistics dashboard-statistics">
      <div class="dashboard-statistics__item statistics-item">
        <h2 class="statistics-item__title">Income statistics</h2>
        <BarChart
          :height="250"
          :chart-data="props.revenue"
          :options="options"
        />
      </div>
      <div class="dashboard-statistics__item statistics-item">
        <h2 class="statistics-item__title">Orders statistics</h2>
        <PieChart :height="250" :chart-data="props.orders" :options="options" />
      </div>
      <div class="dashboard-statistics__item statistics-item">
        <h2 class="statistics-item__title">User growth</h2>
        <LineChart :height="250" :chart-data="props.users" :options="options" />
      </div>
      <div class="dashboard-statistics__item statistics-item">
        <h2 class="statistics-item__title">Balance overview</h2>
        <LineChart :height="250" :chart-data="balance" :options="options" />
      </div>
    </div>
    <div>
      <div class="flex justify-between items-end mb-7">
        <h2 class="font-semibold text-4xl">Top products</h2>
        <select
          class="bg-transparent align-self-end text-lg cursor-pointer"
          @change="selectionOption = $event.target.value"
        >
          <option class="cursor-pointer" value="month">This month</option>
          <option class="cursor-pointer" value="year">This year</option>
          <option class="cursor-pointer" value="all">All time</option>
        </select>
      </div>
      <BaseTable
        v-if="data?.length"
        :header="TOP_SELLING_HEADER"
        :data="data"
        :shadowed="true"
        :sortable="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { BarChart, LineChart, PieChart } from "vue-chart-3";
import { useCatalogStore } from "~/store/catalog";
import { useOrdersStore } from "~/store/orders";
import { TOP_SELLING_HEADER } from "~/constants/dashboard";

const ordersStore = useOrdersStore();
const catalogStore = useCatalogStore();

const { orders: ordersInfo } = storeToRefs(ordersStore);

const { fetchOrders } = ordersStore;
const { fetchCatalogItems } = catalogStore;

const selectionOption = ref("month");

interface SoldItem {
  id: number;
  name: string;
  photo: string;
  item_code: number;
  price: number;
  items_sold: number;
  total_revenue: number;
}

const data = computed(() => {
  const bestSelling = [];
  ordersInfo.value
    .filter((order) => {
      switch (selectionOption.value) {
        case "month":
          return (
            new Date(order.created_at).getMonth() === new Date().getMonth()
          );
        case "year":
          return (
            new Date(order.created_at).getFullYear() ===
            new Date().getFullYear()
          );
        case "all":
          return order;
        default:
          return order;
      }
    })
    .forEach((order) => {
      order.items.forEach((item) => {
        const soldItem = {} as SoldItem;
        const index = bestSelling.findIndex((x) => x.id === item.id);

        if (index !== -1) {
          bestSelling[index].items_sold += item.amount;
          bestSelling[index].total_revenue += item.amount * item.price;
        } else {
          soldItem.id = item.id;
          soldItem.name = item.name;
          soldItem.photo = item.photo;
          soldItem.price = item.price;
          soldItem.item_code = item.item_code;
          soldItem.items_sold = item.amount;
          soldItem.total_revenue = item.amount * item.price;
          bestSelling.push(soldItem);
        }
      });
    });

  return bestSelling.sort((a, b) => b.items_sold - a.items_sold).slice(0, 5);
});

const getCurrentMonth = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month, 1);

  while (endDate.getMonth() === month) {
    endDate.setDate(endDate.getDate() + 1);
  }
  return { startDate, endDate };
};

interface DashboardProps {
  revenue: ChartData;
  users: ChartData;
  orders: ChartData;
  balance: ChartData;
  totalItems: number;
  totalRevenue: number;
  totalUsers: number;
  totalOrders: number;
}

const props = defineProps<DashboardProps>();

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: false,
    },
  },
};

onMounted(() => {
  fetchCatalogItems();
  fetchOrders();
  getCurrentMonth();
});
</script>

<style scoped lang="css">
.dashboard__info {
  @apply flex flex-wrap justify-between items-center;
}

.dashboard-info__item {
  @apply relative mb-5 bg-white info-item h-[120px] w-[270px] max-lg:mb-4 max-sm:w-full flex justify-between items-center border border-white shadow-[0_-1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg px-4 overflow-hidden;
}

.info-item__title {
  @apply text-lg tracking-wide text-teal-600 uppercase mb-2 font-semibold;
}

.dashboard-statistics {
  @apply flex flex-wrap justify-between items-center py-7;
}

.dashboard-statistics__item {
  @apply max-2xl:mx-auto max-2xl:w-[700px] bg-white mb-10 w-[550px] h-[350px] px-10 py-5 border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg;
}

.statistics-item__title {
  @apply text-2xl mb-3 font-semibold;
}

.info-item::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #38bdf8;
  width: 100%;
  height: 8px;
  z-index: 999;
}

.filter {
  filter: brightness(0%) saturate(100%);
}

.pie-wrapper .axis {
  display: none;
}

.info-item__picture {
  @apply w-16 h-16 bg-sky-200 flex justify-center items-center border border-sky-200 rounded-lg;
}

.info-item__image {
  @apply h-8 w-8;
}
</style>
