import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldText from '@react-form-fields/material-ui/components/Text';
import Toast from 'components/Shared/Toast';
import { logError } from 'helpers/rxjs-operators/logError';
import useModel from 'hooks/useModel';
import IStock from 'interfaces/models/stock';
import React, { memo, useCallback, useState } from 'react';
import { useCallbackObservable } from 'react-use-observable';
import { of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import stockService from 'services/products';

interface IProps {
  opened: boolean;
  stock?: IStock;
  onComplete: (stock: IStock) => void;
  onCancel: () => void;
}

const useStyle = makeStyles({
  content: {
    width: 400,
    maxWidth: 'calc(95vw - 50px)'
  },
  heading: {
    marginTop: 20,
    marginBottom: 10
  }
});

const StockFormDialog = memo((props: IProps) => {
  const classes = useStyle(props);

  const [model, setModelProp, setModel, , clearModel] = useModel<IStock>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleEnter = useCallback(() => {
    setModel(props.stock || {});
  }, [props.stock, setModel]);

  const handleExit = useCallback(() => {
    clearModel();
  }, [clearModel]);

  const [onSubmit] = useCallbackObservable(
    (isValid: boolean) => {
      return of(isValid).pipe(
        filter(isValid => isValid),
        tap(() => setLoading(true)),
        switchMap(() => stockService.save(model as IStock)),
        tap(
          stock => {
            Toast.show(`${stock.name} foi salvo`);
            props.onComplete(stock);
            setLoading(false);
          },
          err => {
            Toast.error(err);
            setLoading(false);
          }
        ),
        logError()
      );
    },
    [model]
  );

  return (
    <Dialog
      open={props.opened}
      disableBackdropClick
      disableEscapeKeyDown
      onEnter={handleEnter}
      onExited={handleExit}
      TransitionComponent={Transition}
    >
      {loading && <LinearProgress color='secondary' />}

      <FormValidation onSubmit={onSubmit}>
        <DialogTitle>{model.id ? 'Editar' : 'Novo'} Produto</DialogTitle>
        <DialogContent className={classes.content}>
          <FieldText
            label='Nome'
            disabled={loading}
            value={model.name}
            validation='required|min:3|max:50'
            onChange={setModelProp('name', (model, v) => {
              // modelRef.current = model
              model.name = v;
            })}
          />

          <FieldText
            label='Quantidade'
            disabled={loading}
            value={model.quantity}
            validation='integer|min:1|max:9999'
            type='number'
            onChange={setModelProp('quantity', (model, v) => (model.quantity = parseInt(v)))}
          />

          <FieldText
            label='Preço (R$)'
            disabled={loading}
            value={model.price}
            type='number'
            validation='numeric|min:1|max:9999.99'
            onChange={setModelProp('price', (model, v) => (model.price = parseFloat(v)))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancel}>Cancelar</Button>
          <Button color='primary' type='submit' disabled={loading}>
            Salvar
          </Button>
        </DialogActions>
      </FormValidation>
    </Dialog>
  );
});

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}

export default StockFormDialog;
