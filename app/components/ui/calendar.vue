<script setup lang="ts">
import type { CalendarRootProps } from "reka-ui";
import { Icon } from "@iconify/vue";
import { CalendarDate } from "@internationalized/date";
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNext,
  CalendarPrev,
  CalendarRoot,
} from "reka-ui";

const realDay = new Date();

const date = new CalendarDate(
  realDay.getFullYear(),
  realDay.getMonth() + 1,
  realDay.getDate(),
);

const currentDate = defineModel<any>();

const isDateUnavailable: CalendarRootProps["isDateUnavailable"] = (
  calendarDate,
) => {
  return (
    (calendarDate.day < date.day && !(calendarDate.month > date.month)) ||
    calendarDate.month < date.month ||
    calendarDate.year < date.year
  );
};
</script>

<template>
  <CalendarRoot
    v-slot="{ weekDays, grid }"
    :is-date-unavailable="isDateUnavailable"
    :default-value="date"
    class="rounded-xl bg-[var(--bg-main)] p-4 border border-[var(--border-main)] text-[var(--text-primary)] shadow-[0_4px_20px_var(--shadow-soft)]"
    fixed-weeks
    v-model="currentDate"
  >
    <!-- HEADER -->
    <CalendarHeader class="flex items-center justify-between mb-2">
      <CalendarPrev
        class="flex items-center justify-center w-8 h-8 rounded-md cursor-pointer bg-transparent hover:bg-[var(--bg-hover)] active:scale-95 transition focus:outline-none focus:ring-2 focus:ring-[var(--state-focus)]"
      >
        <Icon
          icon="radix-icons:chevron-left"
          class="w-4 h-4 text-[var(--text-primary)]"
        />
      </CalendarPrev>

      <CalendarHeading
        class="text-2xl font-medium text-[var(--text-primary)]"
      />

      <CalendarNext
        class="flex items-center justify-center w-8 h-8 rounded-md cursor-pointer bg-transparent hover:bg-[var(--bg-hover)] active:scale-95 transition focus:outline-none focus:ring-2 focus:ring-[var(--state-focus)]"
      >
        <Icon
          icon="radix-icons:chevron-right"
          class="w-4 h-4 text-[var(--text-primary)]"
        />
      </CalendarNext>
    </CalendarHeader>

    <!-- GRID -->
    <div class="flex flex-col pt-3">
      <CalendarGrid
        v-for="month in grid"
        :key="month.value.toString()"
        class="w-full select-none space-y-1"
      >
        <!-- WEEK DAYS -->
        <CalendarGridHead>
          <CalendarGridRow class="grid grid-cols-7 mb-2">
            <CalendarHeadCell
              v-for="day in weekDays"
              :key="day"
              class="text-xs text-[var(--text-muted)] text-center"
            >
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>

        <!-- DAYS -->
        <CalendarGridBody class="grid gap-1">
          <CalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="index"
            class="grid grid-cols-7"
          >
            <CalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              class="text-center"
            >
              <CalendarCellTrigger
                :day="weekDate"
                :month="month.value"
                class="flex items-center justify-center w-9 h-9 rounded-lg text-sm transition-all duration-150 text-[var(--text-primary)] bg-transparent hover:bg-[var(--bg-hover)] data-[selected]:bg-[var(--accent-primary)] data-[selected]:text-[var(--text-black)] data-[selected]:shadow-[0_0_10px_var(--accent-glow)] data-[highlighted]:bg-[var(--accent-soft)] data-[today]:border data-[today]:border-[var(--border-accent)] data-[outside-view]:text-[var(--text-disabled)] data-[unavailable]:text-[var(--text-disabled)] data-[unavailable]:line-through data-[unavailable]:pointer-events-none focus:outline-none focus:ring-2 focus:ring-[var(--state-focus)]"
              />
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>
