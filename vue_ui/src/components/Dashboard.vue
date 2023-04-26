<template>
  <Banner/>
  <duplicate-check-banner/>
  <ul role="list" class="divide-y divide-gray-100">
    <li v-for="model in models" :key="model.information" class="flex py-2" >
      <div class="bg-white shadow w-full ">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between ">
          <div class="flex gap-x-4">
            <div class="min-w-0 flex-auto">
              <a href="#" class="bg-violet-400 text-white rounded-md px-3 py-1 text-sm font-medium" aria-current="page"> {{model.name}}</a>
            </div>
          </div>
          <p class="text-xs leading-5 text-gray-500"> {{model.table}}</p>
          <div class="hidden sm:flex sm:flex-col sm:items-end">
            <model-options-dropdown/>
          </div>
        </div>
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-middle">
          <p class="text-sm leading-6 text-gray-900">{{ model.description}}</p>
        </div>

      </div>
    </li>
  </ul>
</template>
<script setup>
const models = [
  {
    name: 'model1',
    table: 'table1',
    description: 'informatie over model1',
  },
  {
    name: 'model2',
    table: 'table',
    description: 'extra informatie over model2',
  },
  {
    name: 'model3',
    table: 'table',
    description: 'extra informatie over model3',
}
]
</script>

<script>
import ModelOptionsDropdown from "@/components/ModelOptionsDropdown.vue";
import Banner from "@/components/Banner.vue";

<c-plauti-page-header dupcheck-dc3jobpage_dc3jobpage="" dupcheck-plautipageheader_plautipageheader-host=""
                      style="position: sticky;">
  <div dupcheck-plautipageheader_plautipageheader="" className="slds-page-header">
    <div dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__row">
      <div dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__col-title">
        <div dupcheck-plautipageheader_plautipageheader="" className="slds-media">
          <div dupcheck-plautipageheader_plautipageheader="" className="slds-media__figure">
            <div dupcheck-plautipageheader_plautipageheader="" className="header-icon slds-align_absolute-center"><img
                dupcheck-plautipageheader_plautipageheader="" alt="Custom Icon"
                src="/resource/1681301690000/dupcheck__dupcheckAssets/dupcheckAssets/lightning/app/app_icon_48.png">
            </div>
          </div>
          <div dupcheck-plautipageheader_plautipageheader="" className="slds-media__body">
            <div dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__name">
              <div dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__name-title"><h1
                  dupcheck-plautipageheader_plautipageheader=""><span dupcheck-plautipageheader_plautipageheader=""
                                                                      className="slds-page-header__title slds-truncate"
                                                                      title="Test">Test</span></h1></div>
            </div>
            <p dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__name-meta">Job Results</p>
          </div>
        </div>
      </div>
      <div dupcheck-plautipageheader_plautipageheader=""
           className="slds-page-header__col_actions slds-align_absolute-center">
        <slot dupcheck-plautipageheader_plautipageheader="" name="actions">
          <div dupcheck-dc3jobpage_dc3jobpage="" slot="actions">
            <lightning-button-group dupcheck-dc3jobpage_dc3jobpage=""
                                    className="slds-p-right_xx-small slds-button-group" role="group"
                                    interop-buttongroup_buttongroup-host="">
              <div interop-buttongroup_buttongroup="" className="fix_button-group-flexbox" part="button-group">
                <slot interop-buttongroup_buttongroup="">
                  <c-plauti-spinner-button dupcheck-dc3jobpage_dc3jobpage="" title="Open All Groups"
                                           dupcheck-plautispinnerbutton_plautispinnerbutton-host="">
                    <button dupcheck-plautispinnerbutton_plautispinnerbutton=""
                            className="left-group slds-button slds-button_neutral" style="vertical-align: middle;">
                      <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                           className="slds-grid slds-grid_vertical-align-center">
                        <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                             className="slds-icon_container slds-button__icon_left slds-is-relative"
                             id="button-container-70">
                          <lightning-icon dupcheck-plautispinnerbutton_plautispinnerbutton=""
                                          className="icon-test slds-icon-utility-chevrondown slds-icon_container"
                                          icon-name="utility:chevrondown"><span part="boundary"><lightning-primitive-icon><svg
                              className="slds-icon slds-icon-text-default slds-icon_xx-small" focusable="false"
                              data-key="chevrondown" aria-hidden="true" viewBox="0 0 52 52" part="icon"><g><path
                              d="M47.6 17.8L27.1 38.5c-.6.6-1.6.6-2.2 0L4.4 17.8c-.6-.6-.6-1.6 0-2.2l2.2-2.2c.6-.6 1.6-.6 2.2 0l16.1 16.3c.6.6 1.6.6 2.2 0l16.1-16.2c.6-.6 1.6-.6 2.2 0l2.2 2.2c.5.6.5 1.5 0 2.1z"></path></g></svg></lightning-primitive-icon></span>
                          </lightning-icon>
                        </div>
                        Open All Groups
                      </div>
                    </button>
                  </c-plauti-spinner-button>
                  <c-plauti-spinner-button dupcheck-dc3jobpage_dc3jobpage="" title="Close All Groups"
                                           dupcheck-plautispinnerbutton_plautispinnerbutton-host="">
                    <button dupcheck-plautispinnerbutton_plautispinnerbutton=""
                            className="right-group slds-button slds-button_neutral" style="vertical-align: middle;">
                      <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                           className="slds-grid slds-grid_vertical-align-center">
                        <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                             className="slds-icon_container slds-button__icon_left slds-is-relative"
                             id="button-container-73">
                          <lightning-icon dupcheck-plautispinnerbutton_plautispinnerbutton=""
                                          className="icon-test slds-icon-utility-chevronup slds-icon_container"
                                          icon-name="utility:chevronup"><span part="boundary"><lightning-primitive-icon><svg
                              className="slds-icon slds-icon-text-default slds-icon_xx-small" focusable="false"
                              data-key="chevronup" aria-hidden="true" viewBox="0 0 52 52" part="icon"><g><path
                              d="M4.4 34.2l20.5-20.7c.6-.6 1.6-.6 2.2 0l20.5 20.7c.6.6.6 1.6 0 2.2l-2.2 2.2c-.6.6-1.6.6-2.2 0L27.1 22.2c-.6-.6-1.6-.6-2.2 0L8.8 38.5c-.6.6-1.6.6-2.2 0l-2.2-2.2c-.5-.6-.5-1.5 0-2.1z"></path></g></svg></lightning-primitive-icon></span>
                          </lightning-icon>
                        </div>
                        Close All Groups
                      </div>
                    </button>
                  </c-plauti-spinner-button>
                </slot>
              </div>
            </lightning-button-group>
            <c-plauti-spinner-button dupcheck-dc3jobpage_dc3jobpage="" className="slds-p-right_xx-small" title="Refresh"
                                     dupcheck-plautispinnerbutton_plautispinnerbutton-host="">
              <button dupcheck-plautispinnerbutton_plautispinnerbutton="" className="slds-button slds-button_neutral"
                      style="vertical-align: middle;">
                <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                     className="slds-grid slds-grid_vertical-align-center">
                  <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                       className="slds-icon_container slds-button__icon_left slds-is-relative" id="button-container-76">
                    <lightning-icon dupcheck-plautispinnerbutton_plautispinnerbutton=""
                                    className="icon-test slds-icon-utility-refresh slds-icon_container"
                                    icon-name="utility:refresh"><span part="boundary"><lightning-primitive-icon><svg
                        className="slds-icon slds-icon-text-default slds-icon_xx-small" focusable="false"
                        data-key="refresh" aria-hidden="true" viewBox="0 0 52 52" part="icon"><g><path
                        d="M46.5 4h-3c-.8 0-1.5.7-1.5 1.5v7c0 .9-.5 1.3-1.2.7-.3-.4-.6-.7-1-1-5-5-12-7.1-19.2-5.7-2.5.5-4.9 1.5-7 2.9-6.1 4-9.6 10.5-9.7 17.5-.1 5.4 2 10.8 5.8 14.7 4 4.2 9.4 6.5 15.2 6.5 5.1 0 9.9-1.8 13.7-5 .7-.6.7-1.6.1-2.2l-2.1-2.1c-.5-.5-1.4-.6-2-.1-3.6 3-8.5 4.2-13.4 3-1.3-.3-2.6-.9-3.8-1.6C11.7 36.6 9 30 10.6 23.4c.3-1.3.9-2.6 1.6-3.8C15 14.7 19.9 12 25.1 12c4 0 7.8 1.6 10.6 4.4.5.4.9.9 1.2 1.4.3.8-.4 1.2-1.3 1.2h-7c-.8 0-1.5.7-1.5 1.5v3.1c0 .8.6 1.4 1.4 1.4h18.3c.7 0 1.3-.6 1.3-1.3V5.5C48 4.7 47.3 4 46.5 4z"></path></g></svg></lightning-primitive-icon></span>
                    </lightning-icon>
                  </div>
                  Refresh
                </div>
              </button>
            </c-plauti-spinner-button>
            <c-plauti-spinner-button dupcheck-dc3jobpage_dc3jobpage="" className="slds-p-right_xx-small"
                                     data-object="job" title="Share"
                                     dupcheck-plautispinnerbutton_plautispinnerbutton-host="">
              <button dupcheck-plautispinnerbutton_plautispinnerbutton="" className="slds-button slds-button_neutral"
                      style="vertical-align: middle;">
                <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                     className="slds-grid slds-grid_vertical-align-center">
                  <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                       className="slds-icon_container slds-button__icon_left slds-is-relative" id="button-container-79">
                    <lightning-icon dupcheck-plautispinnerbutton_plautispinnerbutton=""
                                    className="icon-test slds-icon-utility-internal-share slds-icon_container"
                                    icon-name="utility:internal_share"><span part="boundary"><lightning-primitive-icon><svg
                        className="slds-icon slds-icon-text-default slds-icon_xx-small" focusable="false"
                        data-key="internal_share" aria-hidden="true" viewBox="0 0 52 52" part="icon"><g><path
                        fill-rule="evenodd" clip-rule="evenodd"
                        d="M2.3 37.9v.2c0 .8.6 1.4 1.4 1.4.4 0 .7-.1 1-.4 0 0 10.1-10.9 22.5-7.6v11c0 .8.6 1.4 1.4 1.4.3 0 .5-.1.7-.2l20.1-17.1c.3-.3.5-.7.5-1.1 0-.4-.2-.8-.4-1L29.4 8.2c-.2-.1-.5-.2-.8-.2-.8 0-1.4.6-1.4 1.4v10.3c-.1 0-19.9-3-24.9 18.2z"></path></g></svg></lightning-primitive-icon></span>
                    </lightning-icon>
                  </div>
                  Share
                </div>
              </button>
            </c-plauti-spinner-button>
            <c-plauti-spinner-button dupcheck-dc3jobpage_dc3jobpage="" className="slds-p-right_xx-small" title="Filter"
                                     dupcheck-plautispinnerbutton_plautispinnerbutton-host="">
              <button dupcheck-plautispinnerbutton_plautispinnerbutton="" className="slds-button slds-button_neutral"
                      style="vertical-align: middle;">
                <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                     className="slds-grid slds-grid_vertical-align-center">
                  <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                       className="slds-icon_container slds-button__icon_left slds-is-relative" id="button-container-82">
                    <lightning-icon dupcheck-plautispinnerbutton_plautispinnerbutton=""
                                    className="icon-test slds-icon-utility-filterList slds-icon_container"
                                    icon-name="utility:filterList"><span part="boundary"><lightning-primitive-icon><svg
                        className="slds-icon slds-icon-text-default slds-icon_xx-small" focusable="false"
                        data-key="filterList" aria-hidden="true" viewBox="0 0 52 52" part="icon"><g><path
                        d="M48.3 4H3.9C2.4 4 1.7 5.7 2.6 6.8L22 29.5c.6.7.9 1.7.9 2.6v14.4c0 .8.8 1.5 1.6 1.5h3c.8 0 1.4-.7 1.4-1.5V32.1c0-1 .4-1.9 1.1-2.6L49.6 6.8c.9-1.1.2-2.8-1.3-2.8z"></path></g></svg></lightning-primitive-icon></span>
                    </lightning-icon>
                  </div>
                  Filter
                </div>
              </button>
            </c-plauti-spinner-button>
            <c-plauti-spinner-button dupcheck-dc3jobpage_dc3jobpage="" title="Back to Job Overview"
                                     dupcheck-plautispinnerbutton_plautispinnerbutton-host="">
              <button dupcheck-plautispinnerbutton_plautispinnerbutton="" className="slds-button slds-button_neutral"
                      style="vertical-align: middle;">
                <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                     className="slds-grid slds-grid_vertical-align-center">
                  <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                       className="slds-icon_container slds-button__icon_left slds-is-relative" id="button-container-85">
                    <lightning-icon dupcheck-plautispinnerbutton_plautispinnerbutton=""
                                    className="icon-test slds-icon-utility-back slds-icon_container"
                                    icon-name="utility:back"><span part="boundary"><lightning-primitive-icon><svg
                        className="slds-icon slds-icon-text-default slds-icon_xx-small" focusable="false"
                        data-key="back" aria-hidden="true" viewBox="0 0 52 52" part="icon"><g><path
                        d="M48.6 23H15.4c-.9 0-1.3-1.1-.7-1.7l9.6-9.6c.6-.6.6-1.5 0-2.1l-2.2-2.2c-.6-.6-1.5-.6-2.1 0L2.5 25c-.6.6-.6 1.5 0 2.1L20 44.6c.6.6 1.5.6 2.1 0l2.1-2.1c.6-.6.6-1.5 0-2.1l-9.6-9.6c-.6-.7-.2-1.8.7-1.8h33.2c.8 0 1.5-.6 1.5-1.4v-3c0-.8-.6-1.6-1.4-1.6z"></path></g></svg></lightning-primitive-icon></span>
                    </lightning-icon>
                  </div>
                  Back
                </div>
              </button>
            </c-plauti-spinner-button>
          </div>
        </slot>
      </div>
    </div>
    <div dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__row slds-page-header__row_gutters">
      <div dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__col-details">
        <ul dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__detail-row slds-m-top_medium">
          <li dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__detail-block">
            <slot dupcheck-plautipageheader_plautipageheader="" className="contentLeft" name="contentLeft">
              <div dupcheck-dc3jobpage_dc3jobpage="" slot="contentLeft">
                <div dupcheck-dc3jobpage_dc3jobpage="" className="slds-form-element"><label
                    className="slds-form-element__label slds-truncate" dupcheck-dc3jobpage_dc3jobpage="">Status</label>
                  <div dupcheck-dc3jobpage_dc3jobpage="" className="slds-form-element__control">
                    <div dupcheck-dc3jobpage_dc3jobpage="" style="display: flex; flex: 1 1 20px; flex-direction: row;">
                      <div dupcheck-dc3jobpage_dc3jobpage=""
                           className="slds-input slds-truncate slds-align_absolute-center readonly-component"
                           title="status"
                           style="line-height: 21px; vertical-align: middle; padding-right: 4px;">Completed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </slot>
          </li>
          <li dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__detail-block">
            <c-plauti-read-only-text dupcheck-plautipageheader_plautipageheader=""
                                     dupcheck-plautireadonlytext_plautireadonlytext-host="">
              <div dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element"><label
                  dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element__label slds-truncate">Average
                Score</label>
                <div dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element__control">
                  <div dupcheck-plautireadonlytext_plautireadonlytext=""
                       className="slds-input slds-truncate readonly-component" title="86%">86%
                  </div>
                </div>
              </div>
            </c-plauti-read-only-text>
          </li>
          <li dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__detail-block">
            <c-plauti-read-only-text dupcheck-plautipageheader_plautipageheader=""
                                     dupcheck-plautireadonlytext_plautireadonlytext-host="">
              <div dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element"><label
                  dupcheck-plautireadonlytext_plautireadonlytext=""
                  className="slds-form-element__label slds-truncate">Groups</label>
                <div dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element__control">
                  <div dupcheck-plautireadonlytext_plautireadonlytext=""
                       className="slds-input slds-truncate readonly-component" title="198">198
                  </div>
                </div>
              </div>
            </c-plauti-read-only-text>
          </li>
          <li dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__detail-block">
            <c-plauti-read-only-text dupcheck-plautipageheader_plautipageheader=""
                                     dupcheck-plautireadonlytext_plautireadonlytext-host="">
              <div dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element"><label
                  dupcheck-plautireadonlytext_plautireadonlytext=""
                  className="slds-form-element__label slds-truncate">Pairs</label>
                <div dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element__control">
                  <div dupcheck-plautireadonlytext_plautireadonlytext=""
                       className="slds-input slds-truncate readonly-component" title="198">198
                  </div>
                </div>
              </div>
            </c-plauti-read-only-text>
          </li>
          <li dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__detail-block">
            <c-plauti-read-only-text dupcheck-plautipageheader_plautipageheader=""
                                     dupcheck-plautireadonlytext_plautireadonlytext-host="">
              <div dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element"><label
                  dupcheck-plautireadonlytext_plautireadonlytext=""
                  className="slds-form-element__label slds-truncate">Records</label>
                <div dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element__control">
                  <div dupcheck-plautireadonlytext_plautireadonlytext=""
                       className="slds-input slds-truncate readonly-component" title="396">396
                  </div>
                </div>
              </div>
            </c-plauti-read-only-text>
          </li>
          <li dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__detail-block">
            <c-plauti-read-only-text dupcheck-plautipageheader_plautipageheader=""
                                     dupcheck-plautireadonlytext_plautireadonlytext-host="">
              <div dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element"><label
                  dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element__label slds-truncate">Job
                ID</label>
                <div dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element__control">
                  <div dupcheck-plautireadonlytext_plautireadonlytext=""
                       className="slds-input slds-truncate readonly-component"
                       title="a0C7Q00000Cz1zsUAB">a0C7Q00000Cz1zsUAB
                  </div>
                </div>
              </div>
            </c-plauti-read-only-text>
          </li>
          <li dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__detail-block">
            <slot dupcheck-plautipageheader_plautipageheader="" name="contentRight"></slot>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div dupcheck-plautipageheader_plautipageheader="" className="slds-page-header">
    <div dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__row">
      <div dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__col-title">
        <div dupcheck-plautipageheader_plautipageheader="" className="slds-media">
          <div dupcheck-plautipageheader_plautipageheader="" className="slds-media__figure">
            <div dupcheck-plautipageheader_plautipageheader="" className="header-icon slds-align_absolute-center"><img
                dupcheck-plautipageheader_plautipageheader="" alt="Custom Icon"
                src="/resource/1681301690000/dupcheck__dupcheckAssets/dupcheckAssets/lightning/app/app_icon_48.png">
            </div>
          </div>
          <div dupcheck-plautipageheader_plautipageheader="" className="slds-media__body">
            <div dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__name">
              <div dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__name-title"><h1
                  dupcheck-plautipageheader_plautipageheader=""><span dupcheck-plautipageheader_plautipageheader=""
                                                                      className="slds-page-header__title slds-truncate"
                                                                      title="Test">Test</span></h1></div>
            </div>
            <p dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__name-meta">Job Results</p>
          </div>
        </div>
      </div>
      <div dupcheck-plautipageheader_plautipageheader=""
           className="slds-page-header__col_actions slds-align_absolute-center">
        <slot dupcheck-plautipageheader_plautipageheader="" name="actions">
          <div dupcheck-dc3jobpage_dc3jobpage="" slot="actions">
            <lightning-button-group dupcheck-dc3jobpage_dc3jobpage=""
                                    className="slds-p-right_xx-small slds-button-group" role="group"
                                    interop-buttongroup_buttongroup-host="">
              <div interop-buttongroup_buttongroup="" className="fix_button-group-flexbox" part="button-group">
                <slot interop-buttongroup_buttongroup="">
                  <c-plauti-spinner-button dupcheck-dc3jobpage_dc3jobpage="" title="Open All Groups"
                                           dupcheck-plautispinnerbutton_plautispinnerbutton-host="">
                    <button dupcheck-plautispinnerbutton_plautispinnerbutton=""
                            className="left-group slds-button slds-button_neutral" style="vertical-align: middle;">
                      <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                           className="slds-grid slds-grid_vertical-align-center">
                        <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                             className="slds-icon_container slds-button__icon_left slds-is-relative"
                             id="button-container-70">
                          <lightning-icon dupcheck-plautispinnerbutton_plautispinnerbutton=""
                                          className="icon-test slds-icon-utility-chevrondown slds-icon_container"
                                          icon-name="utility:chevrondown"><span part="boundary"><lightning-primitive-icon><svg
                              className="slds-icon slds-icon-text-default slds-icon_xx-small" focusable="false"
                              data-key="chevrondown" aria-hidden="true" viewBox="0 0 52 52" part="icon"><g><path
                              d="M47.6 17.8L27.1 38.5c-.6.6-1.6.6-2.2 0L4.4 17.8c-.6-.6-.6-1.6 0-2.2l2.2-2.2c.6-.6 1.6-.6 2.2 0l16.1 16.3c.6.6 1.6.6 2.2 0l16.1-16.2c.6-.6 1.6-.6 2.2 0l2.2 2.2c.5.6.5 1.5 0 2.1z"></path></g></svg></lightning-primitive-icon></span>
                          </lightning-icon>
                        </div>
                        Open All Groups
                      </div>
                    </button>
                  </c-plauti-spinner-button>
                  <c-plauti-spinner-button dupcheck-dc3jobpage_dc3jobpage="" title="Close All Groups"
                                           dupcheck-plautispinnerbutton_plautispinnerbutton-host="">
                    <button dupcheck-plautispinnerbutton_plautispinnerbutton=""
                            className="right-group slds-button slds-button_neutral" style="vertical-align: middle;">
                      <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                           className="slds-grid slds-grid_vertical-align-center">
                        <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                             className="slds-icon_container slds-button__icon_left slds-is-relative"
                             id="button-container-73">
                          <lightning-icon dupcheck-plautispinnerbutton_plautispinnerbutton=""
                                          className="icon-test slds-icon-utility-chevronup slds-icon_container"
                                          icon-name="utility:chevronup"><span part="boundary"><lightning-primitive-icon><svg
                              className="slds-icon slds-icon-text-default slds-icon_xx-small" focusable="false"
                              data-key="chevronup" aria-hidden="true" viewBox="0 0 52 52" part="icon"><g><path
                              d="M4.4 34.2l20.5-20.7c.6-.6 1.6-.6 2.2 0l20.5 20.7c.6.6.6 1.6 0 2.2l-2.2 2.2c-.6.6-1.6.6-2.2 0L27.1 22.2c-.6-.6-1.6-.6-2.2 0L8.8 38.5c-.6.6-1.6.6-2.2 0l-2.2-2.2c-.5-.6-.5-1.5 0-2.1z"></path></g></svg></lightning-primitive-icon></span>
                          </lightning-icon>
                        </div>
                        Close All Groups
                      </div>
                    </button>
                  </c-plauti-spinner-button>
                </slot>
              </div>
            </lightning-button-group>
            <c-plauti-spinner-button dupcheck-dc3jobpage_dc3jobpage="" className="slds-p-right_xx-small" title="Refresh"
                                     dupcheck-plautispinnerbutton_plautispinnerbutton-host="">
              <button dupcheck-plautispinnerbutton_plautispinnerbutton="" className="slds-button slds-button_neutral"
                      style="vertical-align: middle;">
                <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                     className="slds-grid slds-grid_vertical-align-center">
                  <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                       className="slds-icon_container slds-button__icon_left slds-is-relative" id="button-container-76">
                    <lightning-icon dupcheck-plautispinnerbutton_plautispinnerbutton=""
                                    className="icon-test slds-icon-utility-refresh slds-icon_container"
                                    icon-name="utility:refresh"><span part="boundary"><lightning-primitive-icon><svg
                        className="slds-icon slds-icon-text-default slds-icon_xx-small" focusable="false"
                        data-key="refresh" aria-hidden="true" viewBox="0 0 52 52" part="icon"><g><path
                        d="M46.5 4h-3c-.8 0-1.5.7-1.5 1.5v7c0 .9-.5 1.3-1.2.7-.3-.4-.6-.7-1-1-5-5-12-7.1-19.2-5.7-2.5.5-4.9 1.5-7 2.9-6.1 4-9.6 10.5-9.7 17.5-.1 5.4 2 10.8 5.8 14.7 4 4.2 9.4 6.5 15.2 6.5 5.1 0 9.9-1.8 13.7-5 .7-.6.7-1.6.1-2.2l-2.1-2.1c-.5-.5-1.4-.6-2-.1-3.6 3-8.5 4.2-13.4 3-1.3-.3-2.6-.9-3.8-1.6C11.7 36.6 9 30 10.6 23.4c.3-1.3.9-2.6 1.6-3.8C15 14.7 19.9 12 25.1 12c4 0 7.8 1.6 10.6 4.4.5.4.9.9 1.2 1.4.3.8-.4 1.2-1.3 1.2h-7c-.8 0-1.5.7-1.5 1.5v3.1c0 .8.6 1.4 1.4 1.4h18.3c.7 0 1.3-.6 1.3-1.3V5.5C48 4.7 47.3 4 46.5 4z"></path></g></svg></lightning-primitive-icon></span>
                    </lightning-icon>
                  </div>
                  Refresh
                </div>
              </button>
            </c-plauti-spinner-button>
            <c-plauti-spinner-button dupcheck-dc3jobpage_dc3jobpage="" className="slds-p-right_xx-small"
                                     data-object="job" title="Share"
                                     dupcheck-plautispinnerbutton_plautispinnerbutton-host="">
              <button dupcheck-plautispinnerbutton_plautispinnerbutton="" className="slds-button slds-button_neutral"
                      style="vertical-align: middle;">
                <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                     className="slds-grid slds-grid_vertical-align-center">
                  <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                       className="slds-icon_container slds-button__icon_left slds-is-relative" id="button-container-79">
                    <lightning-icon dupcheck-plautispinnerbutton_plautispinnerbutton=""
                                    className="icon-test slds-icon-utility-internal-share slds-icon_container"
                                    icon-name="utility:internal_share"><span part="boundary"><lightning-primitive-icon><svg
                        className="slds-icon slds-icon-text-default slds-icon_xx-small" focusable="false"
                        data-key="internal_share" aria-hidden="true" viewBox="0 0 52 52" part="icon"><g><path
                        fill-rule="evenodd" clip-rule="evenodd"
                        d="M2.3 37.9v.2c0 .8.6 1.4 1.4 1.4.4 0 .7-.1 1-.4 0 0 10.1-10.9 22.5-7.6v11c0 .8.6 1.4 1.4 1.4.3 0 .5-.1.7-.2l20.1-17.1c.3-.3.5-.7.5-1.1 0-.4-.2-.8-.4-1L29.4 8.2c-.2-.1-.5-.2-.8-.2-.8 0-1.4.6-1.4 1.4v10.3c-.1 0-19.9-3-24.9 18.2z"></path></g></svg></lightning-primitive-icon></span>
                    </lightning-icon>
                  </div>
                  Share
                </div>
              </button>
            </c-plauti-spinner-button>
            <c-plauti-spinner-button dupcheck-dc3jobpage_dc3jobpage="" className="slds-p-right_xx-small" title="Filter"
                                     dupcheck-plautispinnerbutton_plautispinnerbutton-host="">
              <button dupcheck-plautispinnerbutton_plautispinnerbutton="" className="slds-button slds-button_neutral"
                      style="vertical-align: middle;">
                <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                     className="slds-grid slds-grid_vertical-align-center">
                  <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                       className="slds-icon_container slds-button__icon_left slds-is-relative" id="button-container-82">
                    <lightning-icon dupcheck-plautispinnerbutton_plautispinnerbutton=""
                                    className="icon-test slds-icon-utility-filterList slds-icon_container"
                                    icon-name="utility:filterList"><span part="boundary"><lightning-primitive-icon><svg
                        className="slds-icon slds-icon-text-default slds-icon_xx-small" focusable="false"
                        data-key="filterList" aria-hidden="true" viewBox="0 0 52 52" part="icon"><g><path
                        d="M48.3 4H3.9C2.4 4 1.7 5.7 2.6 6.8L22 29.5c.6.7.9 1.7.9 2.6v14.4c0 .8.8 1.5 1.6 1.5h3c.8 0 1.4-.7 1.4-1.5V32.1c0-1 .4-1.9 1.1-2.6L49.6 6.8c.9-1.1.2-2.8-1.3-2.8z"></path></g></svg></lightning-primitive-icon></span>
                    </lightning-icon>
                  </div>
                  Filter
                </div>
              </button>
            </c-plauti-spinner-button>
            <c-plauti-spinner-button dupcheck-dc3jobpage_dc3jobpage="" title="Back to Job Overview"
                                     dupcheck-plautispinnerbutton_plautispinnerbutton-host="">
              <button dupcheck-plautispinnerbutton_plautispinnerbutton="" className="slds-button slds-button_neutral"
                      style="vertical-align: middle;">
                <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                     className="slds-grid slds-grid_vertical-align-center">
                  <div dupcheck-plautispinnerbutton_plautispinnerbutton=""
                       className="slds-icon_container slds-button__icon_left slds-is-relative" id="button-container-85">
                    <lightning-icon dupcheck-plautispinnerbutton_plautispinnerbutton=""
                                    className="icon-test slds-icon-utility-back slds-icon_container"
                                    icon-name="utility:back"><span part="boundary"><lightning-primitive-icon><svg
                        className="slds-icon slds-icon-text-default slds-icon_xx-small" focusable="false"
                        data-key="back" aria-hidden="true" viewBox="0 0 52 52" part="icon"><g><path
                        d="M48.6 23H15.4c-.9 0-1.3-1.1-.7-1.7l9.6-9.6c.6-.6.6-1.5 0-2.1l-2.2-2.2c-.6-.6-1.5-.6-2.1 0L2.5 25c-.6.6-.6 1.5 0 2.1L20 44.6c.6.6 1.5.6 2.1 0l2.1-2.1c.6-.6.6-1.5 0-2.1l-9.6-9.6c-.6-.7-.2-1.8.7-1.8h33.2c.8 0 1.5-.6 1.5-1.4v-3c0-.8-.6-1.6-1.4-1.6z"></path></g></svg></lightning-primitive-icon></span>
                    </lightning-icon>
                  </div>
                  Back
                </div>
              </button>
            </c-plauti-spinner-button>
          </div>
        </slot>
      </div>
    </div>
    <div dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__row slds-page-header__row_gutters">
      <div dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__col-details">
        <ul dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__detail-row slds-m-top_medium">
          <li dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__detail-block">
            <slot dupcheck-plautipageheader_plautipageheader="" className="contentLeft" name="contentLeft">
              <div dupcheck-dc3jobpage_dc3jobpage="" slot="contentLeft">
                <div dupcheck-dc3jobpage_dc3jobpage="" className="slds-form-element"><label
                    className="slds-form-element__label slds-truncate" dupcheck-dc3jobpage_dc3jobpage="">Status</label>
                  <div dupcheck-dc3jobpage_dc3jobpage="" className="slds-form-element__control">
                    <div dupcheck-dc3jobpage_dc3jobpage="" style="display: flex; flex: 1 1 20px; flex-direction: row;">
                      <div dupcheck-dc3jobpage_dc3jobpage=""
                           className="slds-input slds-truncate slds-align_absolute-center readonly-component"
                           title="status"
                           style="line-height: 21px; vertical-align: middle; padding-right: 4px;">Completed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </slot>
          </li>
          <li dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__detail-block">
            <c-plauti-read-only-text dupcheck-plautipageheader_plautipageheader=""
                                     dupcheck-plautireadonlytext_plautireadonlytext-host="">
              <div dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element"><label
                  dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element__label slds-truncate">Average
                Score</label>
                <div dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element__control">
                  <div dupcheck-plautireadonlytext_plautireadonlytext=""
                       className="slds-input slds-truncate readonly-component" title="86%">86%
                  </div>
                </div>
              </div>
            </c-plauti-read-only-text>
          </li>
          <li dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__detail-block">
            <c-plauti-read-only-text dupcheck-plautipageheader_plautipageheader=""
                                     dupcheck-plautireadonlytext_plautireadonlytext-host="">
              <div dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element"><label
                  dupcheck-plautireadonlytext_plautireadonlytext=""
                  className="slds-form-element__label slds-truncate">Groups</label>
                <div dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element__control">
                  <div dupcheck-plautireadonlytext_plautireadonlytext=""
                       className="slds-input slds-truncate readonly-component" title="198">198
                  </div>
                </div>
              </div>
            </c-plauti-read-only-text>
          </li>
          <li dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__detail-block">
            <c-plauti-read-only-text dupcheck-plautipageheader_plautipageheader=""
                                     dupcheck-plautireadonlytext_plautireadonlytext-host="">
              <div dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element"><label
                  dupcheck-plautireadonlytext_plautireadonlytext=""
                  className="slds-form-element__label slds-truncate">Pairs</label>
                <div dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element__control">
                  <div dupcheck-plautireadonlytext_plautireadonlytext=""
                       className="slds-input slds-truncate readonly-component" title="198">198
                  </div>
                </div>
              </div>
            </c-plauti-read-only-text>
          </li>
          <li dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__detail-block">
            <c-plauti-read-only-text dupcheck-plautipageheader_plautipageheader=""
                                     dupcheck-plautireadonlytext_plautireadonlytext-host="">
              <div dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element"><label
                  dupcheck-plautireadonlytext_plautireadonlytext=""
                  className="slds-form-element__label slds-truncate">Records</label>
                <div dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element__control">
                  <div dupcheck-plautireadonlytext_plautireadonlytext=""
                       className="slds-input slds-truncate readonly-component" title="396">396
                  </div>
                </div>
              </div>
            </c-plauti-read-only-text>
          </li>
          <li dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__detail-block">
            <c-plauti-read-only-text dupcheck-plautipageheader_plautipageheader=""
                                     dupcheck-plautireadonlytext_plautireadonlytext-host="">
              <div dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element"><label
                  dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element__label slds-truncate">Job
                ID</label>
                <div dupcheck-plautireadonlytext_plautireadonlytext="" className="slds-form-element__control">
                  <div dupcheck-plautireadonlytext_plautireadonlytext=""
                       className="slds-input slds-truncate readonly-component"
                       title="a0C7Q00000Cz1zsUAB">a0C7Q00000Cz1zsUAB
                  </div>
                </div>
              </div>
            </c-plauti-read-only-text>
          </li>
          <li dupcheck-plautipageheader_plautipageheader="" className="slds-page-header__detail-block">
            <slot dupcheck-plautipageheader_plautipageheader="" name="contentRight"></slot>
          </li>
        </ul>
      </div>
    </div>
  </div>
</c-plauti-page-header>
export default {
  name: "Dashboard",
  components: {
    ModelOptionsDropdown,
    Banner
  },
};
</script>


