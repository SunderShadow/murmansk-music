<script lang="ts">
  import {SvelteDate} from "svelte/reactivity"
  import {onMount} from "svelte"

  let selectedDate = new SvelteDate()

  // Settings
  const datesBeforeCurrentCount = 10
  const datesAfterCurrentCount = 30

  const dateSize = 30 //px

  const monthsText = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ]
  // @ts-ignore
  let slider: HTMLDivElement = $state()
  let tape: HTMLDivElement = $state()

  type MonthDates = {
    month: number,
    dates: Array<Date>
  }
  let dates: Array<Date> = []
  let months: Array<MonthDates> = []
  let currentDateI = 10

  let HTMLDates: NodeListOf<HTMLElement> = $state([])

  let tmpDate = new Date()
  tmpDate.setTime(selectedDate.getTime())
  tmpDate.setDate(tmpDate.getDate() - datesBeforeCurrentCount)

  let monthDates: MonthDates = {
    month: tmpDate.getMonth(),
    dates: []
  }

  // Fill dates
  for (let i = -datesBeforeCurrentCount; i < datesAfterCurrentCount; i++) {
    const nDate = new Date()
    nDate.setTime(selectedDate.getTime())
    nDate.setDate(nDate.getDate() + i)

    if (
      monthDates.month < nDate.getMonth()
      || monthDates.month == 12 && nDate.getMonth() == 1
    ) {
      months.push(monthDates)
      monthDates = {
        month: nDate.getMonth(),
        dates: []
      }
    }
    dates.push(nDate)
    monthDates.dates.push(nDate)
  }
  months.push(monthDates)

  function placeSelectedInCenter() {
    slider.removeEventListener('scroll', calcSelected)
    slider.removeEventListener('scrollend', placeSelectedInCenter)
    slider.scrollTo({
      left: currentDateI * dateSize + dateSize / 2,
      behavior: 'smooth'
    })
    slider.addEventListener('scroll', calcSelected)
    slider.addEventListener('scrollend', placeSelectedInCenter)

  }

  function calcSelected() {
    currentDateI = Math.floor(slider.scrollLeft / dateSize)
    if (currentDateI < 0) {
      currentDateI = 0
    }
    if (currentDateI >= dates.length) {
      currentDateI = dates.length - 1
    }

    selectedDate.setTime(dates[currentDateI].getTime())
  }

  onMount(() => {
    HTMLDates = slider.querySelectorAll('.date')
    placeSelectedInCenter()
    slider.scrollTo({
      left: currentDateI * dateSize + dateSize / 2,
    })
  })
</script>

<div class="date-selector">
  <div class="slider" bind:this={slider}>
    <div class="tape" bind:this={tape}>
      {#each months as v, i}
        <div id="month-{v.month}" class="month" class:selected={v.month === selectedDate.getMonth()}>
          <div>
            <label for="month-{v.month}">
              <span>{monthsText[v.month]}</span>
            </label>
          </div>
          <div class="arrow"></div>
          <div>
            {#each v.dates as date}
              <div class="date" class:active={date.getTime() === selectedDate.getTime()} date={date.getTime()}>
                <span>{date.getDate()}</span>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .date-selector {
    width: 100%;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: calc(100% - 26px);
      width: 100%;
      height: 48px;
      background: rgba(#fff, .1);
    }
  }

  .slider {
    color: #FFF;
    position: absolute;
    width: 100%;
    min-width: 0;

    overflow: auto;
    scrollbar-width: none;


    &::-webkit-scrollbar {
      display: none;
    }
  }

  .tape {
    display: inline-flex;
    font-size: 28px;
    font-weight: 600;

    padding: 0 50%;

    .month {
      opacity: .75;
      transition: opacity 300ms;

      &.selected {
        opacity: 1;
        .arrow {
          background: var(--color-accent);
          transition: background-color 300ms;
        }
        label {
          background: var(--color-accent);
          transition: background-color 300ms;
        }
      }

      .arrow {
        content: '';
        position: sticky;
        top: 20px;
        left: 50%;
        width: 5px;
        height: 8px;
        background: #888888;
      }

      label {
        display: inline-block;
        position: sticky;
        left: 50%;

        width: fit-content;
        font-size: 12px;

        background: #888888;
        padding: 0 12px;
      }

      > div {
        display: flex;
        flex-wrap: nowrap;
      }
    }

    .date {
      transition: color 200ms;
      width: 30px;
      text-align: center;

      > span {
        display: block;
      }
      &.active {
        color: var(--color-accent);
      }
    }
  }
</style>