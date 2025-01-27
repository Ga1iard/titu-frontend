import { Component } from '@angular/core';
import type { ICellRendererAngularComp } from 'ag-grid-angular';
import type { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'actions-cell-renderer',
  standalone: true,
  template: `
    <div class="buttonCell">
      <button class="button-secondary buttonStopSelling" (click)="onRemoveClick()">
        <img src="/img/delete.svg" alt="delete" />
      </button>
      <a href="/operator/add-product"
        class="button-secondary buttonStopSelling" (click)="onEditClick()">
        <img src="/img/delete.svg" alt="delete" />
      </a>
    </div>
  `,
  styles: [
    `
      .buttonCell {
        display: flex;
        gap: 8px;
        flex-direction: row-reverse;
      }

      .buttonCell button, a {
        appearance: none;
        display: inline-block;
        padding: 0.375em 1em 0.5em;
        white-space: nowrap;
        border-radius: 6px;
        box-shadow: 0 0 0 4px transparent, 0 1px 2px 0 #0c111d11;
        outline: none;
        background-color: var(--ag-background-color);
        color: var(--color-fg-primary, #101828);
        border: 1px solid var(--ag-border-color);
        cursor: pointer;
      }

      .removeButton {
        display: flex !important;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 40px;
      }

      .removeButton img {
        width: 20px;
      }

      .buttonStopSelling {
        height: 40px;
        line-height: 1.8;
      }
    `,
  ],
})
export class ActionsCellRenderer implements ICellRendererAngularComp {
  private params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }

  onRemoveClick(): void {
    const rowData = this.params.node.data;
    this.params.api.applyTransaction({ remove: [rowData] });
  }

  onEditClick(): void {
    const rowData = this.params.node.data;
    this.params.api.applyTransaction({ update: [rowData] });
  }

}